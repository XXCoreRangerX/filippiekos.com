import defaults from "@/app.config";
import { CustomMDX } from "@/components/blog/mdx";
import { Navbar } from "@/components/blog/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts, saveDataToJson } from "@/utils/blogUtils";
import { formatDate } from "@/utils/dateUtils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
    saveDataToJson(getPosts(), "content/data/posts.json");
    return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
    if (!params) {
        return;
    }

    let post = getPosts().find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const { title, date: publishedTime, updated: modifiedTime, description, image } = post;
    const fullTitle = `${title} | ${defaults.title}`;
    const ogImage = image ? defaults.url + image : `${defaults.url}/og?title=${title}`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            modifiedTime,
            url: `${defaults.url}/posts/${post.slug}`,
            siteName: defaults.title,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default function Post({ params }: { params: { slug: string; metadata: Metadata; content: string } }) {
    const post = getPosts().find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        datePublished: post.date,
                        dateModified: post.updated,
                        description: post.description,
                        image: post.image ? `${defaults.url}${post.image}` : `${defaults.url}/og?title=${post.title}`,
                        url: `${defaults.url}/posts/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: defaults.fullName,
                        },
                    }),
                }}
            />
            <Card type="header" className="w-full max-w-screen-lg rounded-3xl border-2 shadow-md md:p-10">
                <Navbar link="/" />
                <Suspense fallback={<Skeleton className="description mt-5 h-6 w-48" />}>
                    <h3 className="description mt-5 text-muted-foreground">{formatDate(post.date)}</h3>
                </Suspense>
                {post.updated && (
                    <h3 className="description mt-1 text-sm text-muted-foreground">
                        Updated: {formatDate(post.updated)}
                    </h3>
                )}
                <h1 className="title mt-2 break-words text-4xl font-bold lg:text-5xl">{post.title}</h1>
                {post.image && (
                    <Image
                        src={"/assets/posts/" + post.slug + post.image}
                        alt={post.title}
                        width={2000}
                        height={2000}
                        className="rounded-3xl"
                        priority={true}
                    />
                )}
                <h2 className="description mt-3 break-words">{post.description}</h2>
                <div className="my-4 flex flex-wrap gap-2">
                    {post.tags?.map((tag: any, index: any) => (
                        <Link key={index} href={`/tags/${tag}`}>
                            <Badge variant="muted">{tag}</Badge>
                        </Link>
                    ))}
                </div>
            </Card>
            <Card
                type="article"
                className="prose prose-slate w-full max-w-screen-lg flex-1 rounded-3xl border-2 shadow-md dark:prose-invert max-[350px]:prose-sm md:p-10"
            >
                <CustomMDX source={post.content} />
            </Card>
            <Footer type="posts" className="max-w-screen-lg" />
        </>
    );
}
