import React from 'react';
import type { GetStaticPropsContext, Metadata } from 'next';
import defaults from "@/constants/defaults";
import { notFound } from 'next/navigation';
import { getBlogPosts } from "@/lib/blog";
import { CustomMDX } from "@/app/blog/_components/mdx";
import Image from "next/image";
import { formatDate } from "@/lib/misc";
import { Navbar } from "@/app/blog/_components/navbar";
import PostList from "@/components/post-list";

export async function generateMetadata({ params }: GetStaticPropsContext): Promise<Metadata | undefined> {
    if (!params) {
        return;
    }

    let post = getBlogPosts().find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const {
        title,
        date: publishedTime,
        description,
        image,
    } = post.metadata;
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
            type: 'article',
            publishedTime,
            url: `${defaults.url}/blog/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default function Blog({ params }: { params: { slug: string } }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex justify-center items-center p-5">
            <div
                className="w-full max-w-screen-lg p-10 bg-secondary border-2 dark:border-slate-700 rounded-3xl shadow-md">
                <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.date,
                        dateModified: post.metadata.date,
                        description: post.metadata.description,
                        image: post.metadata.image
                            ? `${defaults.url}${post.metadata.image}`
                            : `${defaults.url}/og?title=${post.metadata.title}`,
                        url: `${defaults.url}/blog/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: defaults.fullName,
                        },
                    }),
                }}
                />
                <Navbar/>
                <h1 className="title font-bold text-5xl mb-4 break-words">{post.metadata.title}</h1>
                <div className="flex flex-row flex-wrap gap-2 my-4">
                    {post.metadata.tags?.map((tag, index) => (
                        <span key={index} className="p-1 dark:bg-slate-700 bg-slate-200 border-slate-300 rounded-md text-xs dark:text-slate-300 text-slate-600 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
                {post.metadata.image && (
                    <Image src={post.metadata.image} alt={post.metadata.title} width={2000} height={2000}
                           className="rounded-3xl"/>
                )}
                <h2 className="description mt-3 mb-4 break-words">
                    {post.metadata.description}
                </h2>
                <p className="description text-muted-foreground">
                    {formatDate(post.metadata.date)}
                </p>
                <hr className="border-slate-600 rounded-full mt-3 mb-4"/>
                <article
                    className="prose max-[350px]:prose-sm lg:prose-lg prose-slate dark:prose-invert prose-img:rounded-3xl prose-a:text-blue-600 hover:prose-a:text-blue-500 max-w-none">
                    <CustomMDX source={post.content}/>
                </article>
                <footer className="mt-10">
                    <Navbar/>
                    <PostList maxPosts={2}/>
                </footer>
            </div>
        </div>
    );
}