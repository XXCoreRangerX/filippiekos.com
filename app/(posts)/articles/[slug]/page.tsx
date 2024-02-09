import React from 'react';
import type { Metadata } from 'next';
import defaults from "@/constants/defaults";
import { notFound } from 'next/navigation';
import { getArticles } from "@/lib/blog";
import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { Navbar } from "@/app/(posts)/_components/navbar";
import { Footer } from "@/app/(posts)/_components/footer";

export async function generateStaticParams() {
    const posts = getArticles().map((post) => post.slug);
    return posts.map((slug) => ({ params: { slug } }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
    if (!params) {
        return;
    }

    let post = getArticles().find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const {
        title,
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
            url: `${defaults.url}/articles/${post.slug}`,
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

export default function Article({ params }: { params: { slug: string, metadata: Metadata, content: string } }) {
    const post = getArticles().find((post) => post.slug === params.slug);

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
                        description: post.metadata.description,
                        image: post.metadata.image
                            ? `${defaults.url}${post.metadata.image}`
                            : `${defaults.url}/og?title=${post.metadata.title}`,
                        url: `${defaults.url}/articles/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: defaults.fullName,
                        },
                    }),
                }}
                />
                <Navbar/>
                <h1 className="title font-bold text-5xl mb-4 break-words">{post.metadata.title}</h1>
                <h2 className="description mt-3 mb-4 break-words">
                    {post.metadata.description}
                </h2>
                <hr className="border-slate-600 rounded-full mt-3 mb-4"/>
                <article
                    className="prose max-[350px]:prose-sm lg:prose-lg prose-slate dark:prose-invert prose-img:rounded-3xl prose-a:text-blue-600 hover:prose-a:text-blue-500 max-w-none">
                    <CustomMDX source={post.content}/>
                </article>
                <Footer/>
            </div>
        </div>
    );
}