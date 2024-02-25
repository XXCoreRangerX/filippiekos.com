import { Footer } from "@/app/(posts)/_components/footer";
import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { Navbar } from "@/app/(posts)/_components/navbar";
import { Separator } from "@/components/ui/separator";
import defaults from "@/constants/defaults";
import { getArticles, saveDataToJson } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";

export async function generateStaticParams() {
    saveDataToJson(
        getArticles(),
        path.join(process.cwd(), "data/articles.json"),
        "articles",
    );
    return getArticles().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata | undefined> {
    if (!params) {
        return;
    }

    let post = getArticles().find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const { title, description, image } = post.metadata;
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
            url: `${defaults.url}/articles/${post.slug}`,
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

export default function Article({
    params,
}: {
    params: { slug: string; metadata: Metadata; content: string };
}) {
    const post = getArticles().find((post) => post.slug === params.slug);

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
                            description: post.metadata.description,
                            image: post.metadata.image
                                ? `${defaults.url}${post.metadata.image}`
                                : `${defaults.url}/og?title=${post.metadata.title}`,
                            url: `${defaults.url}/articles/${post.slug}`,
                            author: {
                                "@type": "Person",
                                name: defaults.fullName,
                            },
                        }),
                    }}
                />
                <Navbar />
                <h1 className="title break-words text-4xl font-bold lg:text-5xl">
                    {post.metadata.title}
                </h1>
                <h2 className="description mb-4 mt-3 break-words">
                    {post.metadata.description}
                </h2>
                <Separator className="my-6" />
                <article className="prose prose-slate max-w-none dark:prose-invert max-[350px]:prose-sm lg:prose-lg prose-img:rounded-3xl">
                    <CustomMDX source={post.content} />
                </article>
                <Footer type="articles" />
            </div>
        </div>
    );
}
