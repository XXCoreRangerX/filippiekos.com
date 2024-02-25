import { Footer } from "@/app/(posts)/_components/footer";
import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { Navbar } from "@/app/(posts)/_components/navbar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import defaults from "@/constants/defaults";
import { getBlogPosts, saveDataToJson } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";
import { Suspense } from "react";

export async function generateStaticParams() {
    saveDataToJson(
        getBlogPosts(),
        path.join(process.cwd(), "data/posts.json"),
        "blog",
    );
    return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata | undefined> {
    if (!params) {
        return;
    }

    let post = getBlogPosts().find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const { title, date: publishedTime, description, image } = post.metadata;
    const fullTitle = `${title} | ${defaults.fullName}`;
    const ogImage = image
        ? defaults.url + image
        : `${defaults.url}/og?title=${title}`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: `${defaults.url}/blog/${post.slug}`,
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

export default function Blog({
    params,
}: {
    params: { slug: string; metadata: Metadata; content: string };
}) {
    const post = getBlogPosts().find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex items-center justify-center p-5 sm:p-8 sm:px-24 lg:p-10">
            <div className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-6 shadow-md md:p-10">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.metadata.title,
                            datePublished: post.metadata.date,
                            dateModified: post.metadata.date,
                            description: post.metadata.description,
                            image: post.metadata.image
                                ? `${defaults.url}${post.metadata.image}`
                                : `${defaults.url}/og?title=${post.metadata.title}`,
                            url: `${defaults.url}/blog/${post.slug}`,
                            author: {
                                "@type": "Person",
                                name: defaults.fullName,
                            },
                        }),
                    }}
                />
                <Navbar />
                <Suspense
                    fallback={
                        <Skeleton className="description mb-2 h-6 w-48" />
                    }
                >
                    <h3 className="description mb-2 text-muted-foreground">
                        {formatDate(post.metadata.date)}
                    </h3>
                </Suspense>
                <h1 className="title break-words text-4xl font-bold lg:text-5xl">
                    {post.metadata.title}
                </h1>
                {post.metadata.image && (
                    <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        width={2000}
                        height={2000}
                        className="rounded-3xl"
                    />
                )}
                <h2 className="description mt-3 break-words">
                    {post.metadata.description}
                </h2>
                <div className="my-4 flex flex-wrap gap-2">
                    {post.metadata.tags?.map((tag: any, index: any) => (
                        <Badge key={index} variant="muted">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Separator className="my-6" />
                <article className="prose prose-slate max-w-none dark:prose-invert max-[350px]:prose-sm lg:prose-lg prose-img:rounded-3xl">
                    <CustomMDX source={post.content} />
                </article>
                <Footer type="blog" />
            </div>
        </div>
    );
}
