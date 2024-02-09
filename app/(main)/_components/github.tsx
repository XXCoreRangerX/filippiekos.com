import defaults from "@/constants/defaults";
import Link from "next/link";
import Image from "next/image";

export async function getStaticProps() {
    try {
        return {
            props: {
                GitHubStats: await GitHubStats()
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

export async function GitHubStats() {
    if (!process.env.GITHUB_TOKEN) {
        throw new Error("GitHub token is not defined.");
    }
    const { data } = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
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
            `
        }),
        next: { revalidate: 86400 },
    }).then(res => res.json());

    if (!data || data.errors) {
        throw new Error("Failed to fetch GitHub data: " + (data?.errors || "Unknown error"));
    }

    if (data.user == null) {
        throw new Error("Failed to fetch GitHub data: User not found");
    }

    let user = data.user;

    let avatarUrl = user.avatarUrl
    let totalFollowers = user.followers.totalCount;
    let totalFollowing = user.following.totalCount;
    let publicRepos = user.repositories.edges.map((edge: any) => edge.node);
    let totalRepos = publicRepos.length;
    let totalStars = publicRepos.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);

    let stats = {
        totalStars,
        totalFollowers,
        totalFollowing,
        totalRepos
    }

    let githubUrl = defaults.socials.find(social => social[0] === "GitHub")?.[2] || "https://github.com/";

    return (
        <Link href={githubUrl} target="blank">
            <div className="flex bg-secondary border-2 dark:border-slate-700 rounded-3xl p-5 gap-6 items-center justify-center shadow-md">
                <Image src={avatarUrl} alt="GitHub Avatar" width={100} height={100} className="border-2 border-slate-200 rounded-full shadow-2xl"/>
                <div>
                    <h3 className="text-lg font-medium">GitHub Stats</h3>
                    {Object.entries(stats).map(([key, value]) => (
                        <h4 key={key} className="text-md flex justify-between">{key.replace('total', '')}: <span className="font-semibold">{value}</span></h4>
                    ))}
                </div>
            </div>
        </Link>
    )
}