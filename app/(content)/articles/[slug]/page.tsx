import { CustomMDX } from "@/app/(content)/_components/mdx";
import { Navbar } from "@/app/(content)/_components/navbar";
import { Footer } from "@/components/footer";
import defaults from "@/constants/defaults";
import { getArticles, saveDataToJson } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    saveDataToJson(getArticles(), "data/articles.json");
    return getArticles().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
    if (!params) {
        return;
    }

    let post = getArticles().find((post) => post.slug === params.slug);
    if (!post) {
        return;
    }

    const { title, description, image } = post;
    const fullTitle = `${title} | ${defaults.fullName}`;
    const ogImage = image ? defaults.url + image : `${defaults.url}/og?title=${title}`;

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

export default function Article({ params }: { params: { slug: string; metadata: Metadata; content: string } }) {
    const post = getArticles().find((post) => post.slug === params.slug);

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
                        description: post.description,
                        image: post.image ? `${defaults.url}${post.image}` : `${defaults.url}/og?title=${post.title}`,
                        url: `${defaults.url}/articles/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: defaults.fullName,
                        },
                    }),
                }}
            />
            <header className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-6 shadow-md md:p-10">
                <Navbar />
                <h1 className="title mt-5 break-words text-4xl font-bold lg:text-5xl">{post.title}</h1>
                <h2 className="description mb-4 mt-3 break-words">{post.description}</h2>
            </header>
            <article className="prose prose-slate w-full max-w-screen-lg flex-1 rounded-3xl border-2 bg-card p-6 shadow-md dark:prose-invert max-[350px]:prose-sm lg:prose-lg md:p-10">
                <CustomMDX source={post.content} />
            </article>
            <Footer />
        </>
    );
}
