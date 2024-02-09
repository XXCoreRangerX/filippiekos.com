import { Footer } from "@/app/(posts)/_components/footer";
import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { Navbar } from "@/app/(posts)/_components/navbar";
import defaults from "@/constants/defaults";
import { getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/misc";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = getBlogPosts().map((post) => post.slug);
    return posts.map((slug) => ({ params: { slug } }));
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
        <div className="flex items-center justify-center p-5">
            <div className="w-full max-w-screen-lg rounded-3xl border-2 bg-secondary p-10 shadow-md dark:border-slate-700">
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
                <h1 className="title mb-4 break-words text-5xl font-bold">
                    {post.metadata.title}
                </h1>
                <div className="my-4 flex flex-row flex-wrap gap-2">
                    {post.metadata.tags?.map((tag: any, index: any) => (
                        <span
                            key={index}
                            className="rounded-md border-slate-300 bg-slate-200 p-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {post.metadata.image && (
                    <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        width={2000}
                        height={2000}
                        className="rounded-3xl"
                    />
                )}
                <h2 className="description mb-4 mt-3 break-words">
                    {post.metadata.description}
                </h2>
                <p className="description text-muted-foreground">
                    {formatDate(post.metadata.date)}
                </p>
                <hr className="mb-4 mt-3 rounded-full border-slate-600" />
                <article className="prose prose-slate max-w-none dark:prose-invert max-[350px]:prose-sm lg:prose-lg prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-3xl">
                    <CustomMDX source={post.content} />
                </article>
                <Footer type="blog" />
            </div>
        </div>
    );
}
