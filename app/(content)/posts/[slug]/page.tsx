import defaults from "@/app.config";
import { CustomMDX } from "@/app/(content)/_components/mdx";
import { Navbar } from "@/app/(content)/_components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts, saveDataToJson } from "@/lib/blog";
import { formatDate } from "@/lib/date";
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

    const { title, date: publishedTime, description, image } = post;
    const fullTitle = `${title} | ${defaults.fullName}`;
    const ogImage = image ? defaults.url + image : `${defaults.url}/og?title=${title}`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: `${defaults.url}/posts/${post.slug}`,
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
                        dateModified: post.date,
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
            <header className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-5 shadow-md md:p-10">
                <Navbar link="/" />
                <Suspense fallback={<Skeleton className="description mb-2 mt-5 h-6 w-48" />}>
                    <h3 className="description mb-2 mt-5 text-muted-foreground">{formatDate(post.date)}</h3>
                </Suspense>
                <h1 className="title break-words text-4xl font-bold lg:text-5xl">{post.title}</h1>
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
            </header>
            <article className="prose prose-slate w-full max-w-screen-lg flex-1 rounded-3xl border-2 bg-card p-5 shadow-md dark:prose-invert max-[350px]:prose-sm md:p-10">
                <CustomMDX source={post.content} />
            </article>
            <Footer type="posts" className="max-w-screen-lg" />
        </>
    );
}
