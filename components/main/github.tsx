import defaults from "@/app.config";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export async function getStaticProps() {
    try {
        return {
            props: {
                GitHubStats: await GitHubStats(),
            },
        };
    } catch (error) {
        console.error("Error fetching GitHub data: ", error);
        return {
            props: {
                GitHubStats: null,
            },
        };
    }
}

interface RepositoryNode {
    node: {
        stargazerCount: number;
        forkCount: number;
    };
}

interface GitHubUser {
    avatarUrl: string;
    followers: {
        totalCount: number;
    };
    following: {
        totalCount: number;
    };
    repositories: {
        edges: RepositoryNode[];
    };
}

interface GitHubData {
    user: GitHubUser;
    errors?: string[];
}

export async function GitHubStats() {
    if (!process.env.GITHUB_TOKEN) {
        throw new Error("GitHub token is not defined.");
    }
    const { data }: { data?: GitHubData } = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
            query: `
                {
                    user(login: "${defaults.username}") {
                        repositories(first: 100, privacy: PUBLIC) {
                            edges {
                                node {
                                    stargazerCount
                                    forkCount
                                }
                            }
                        }

                        avatarUrl

                        followers {
                            totalCount
                        }

                        following {
                            totalCount
                        }
                    }
                }
            `,
        }),
        next: { revalidate: 86400 },
    }).then((res) => res.json());

    if (!data || data.errors || data.user == null) {
        console.warn("Failed to fetch GitHub data: " + (data?.errors || "Check your username and token"));
        return (
            <Card className="flex items-center justify-center gap-6 rounded-3xl border-2 shadow-md">
                <div className="p-6 text-center">
                    <h3 className="mb-1 text-xl font-medium">GitHub Stats Unavailable</h3>
                    <p className="text-gray-500">Could not fetch GitHub data. Please try again later.</p>
                </div>
            </Card>
        );
    }

    const user = data.user;

    const avatarUrl = user.avatarUrl;
    const totalFollowers = user.followers.totalCount;
    const totalFollowing = user.following.totalCount;
    const publicRepos = user.repositories.edges.map((edge: RepositoryNode) => edge.node);
    const totalRepos = publicRepos.length;
    const totalStars = publicRepos.reduce(
        (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
        0,
    );

    const stats = {
        totalStars,
        totalFollowers,
        totalFollowing,
        totalRepos,
    };

    const githubUrl = defaults.socials.find(([name]) => name === "GitHub")?.[1] || "https://github.com/";

    return (
        <Link href={githubUrl} target="blank">
            <Card className="flex items-center justify-center gap-6 rounded-3xl border-2 shadow-md">
                <Suspense
                    fallback={
                        <Skeleton className="h-24 w-24 rounded-full shadow-2xl ring-2 ring-ring lg:hidden xl:block" />
                    }
                >
                    <Image
                        src={avatarUrl}
                        alt="GitHub Avatar"
                        width={100}
                        height={100}
                        className="rounded-full shadow-2xl ring-2 ring-ring lg:hidden xl:block"
                    />
                </Suspense>
                <div>
                    <h3 className="mb-1 text-xl font-medium">GitHub Stats</h3>
                    {Object.entries(stats).map(([key, value]) => (
                        <h4 key={key} className="text-md flex justify-between">
                            {key.replace("total", "")}:{" "}
                            <Suspense fallback={<Skeleton className="mb-1 w-8" />}>
                                <span className="font-semibold">{value}</span>
                            </Suspense>
                        </h4>
                    ))}
                </div>
            </Card>
        </Link>
    );
}
