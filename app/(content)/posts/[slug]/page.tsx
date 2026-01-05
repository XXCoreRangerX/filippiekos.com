import defaults from "@/app.config";
import { CustomMDX } from "@/components/blog/mdx";
import { Navbar } from "@/components/blog/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts, saveDataToJson } from "@/utils/blogUtils";
import { formatDate } from "@/utils/dateUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
    saveDataToJson(getPosts(), "content/data/posts.json");
    return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; metadata: Metadata; content: string }>;
}) {
    const { slug } = await params;

    const post = getPosts().find((post) => post.slug === slug);
    if (!post) {
        notFound();
    }

    const { title, date: publishedTime, updated: modifiedTime, description, image } = post;
    const fullTitle = `${title} | ${defaults.title}`;
    const ogImage = image ? defaults.url + image : `${defaults.url}/og-image.png`;

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
            images: ogImage,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function Post({
    params,
}: {
    params: Promise<{ slug: string; metadata: Metadata; content: string }>;
}) {
    const { slug } = await params;

    const post = getPosts().find((post) => post.slug === slug);

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
            <Card type="header" className="w-full max-w-(--breakpoint-lg) rounded-3xl border-2 shadow-md md:p-10">
                <Navbar />
                <Suspense fallback={<Skeleton className="description mt-5 h-6 w-48" />}>
                    <h3 className="description text-muted-foreground mt-5">{formatDate(post.date)}</h3>
                </Suspense>
                {post.updated && (
                    <h3 className="description text-muted-foreground mt-1 text-sm">
                        Updated: {formatDate(post.updated)}
                    </h3>
                )}
                <h1 className="title mt-2 text-4xl font-bold break-words lg:text-5xl">{post.title}</h1>
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
                    {post.tags?.map((tag: string, index: number) => (
                        <Link key={index} href={`/tags/${tag}`}>
                            <Badge variant="muted">{tag}</Badge>
                        </Link>
                    ))}
                </div>
            </Card>
            <Card
                type="article"
                className="prose prose-slate dark:prose-invert max-[350px]:prose-sm w-full max-w-(--breakpoint-lg) flex-1 rounded-3xl border-2 shadow-md md:p-10"
            >
                <CustomMDX source={post.content} />
            </Card>
            <Footer type="posts" className="max-w-(--breakpoint-lg)" />
        </>
    );
}
