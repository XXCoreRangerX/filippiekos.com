import defaults from "@/app.config";
import { CustomMDX } from "@/components/blog/mdx";
import { Navbar } from "@/components/blog/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { getArticles, saveDataToJson } from "@/utils/blogUtils";
import { formatDate } from "@/utils/dateUtils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    saveDataToJson(getArticles(), "content/data/articles.json");
    return getArticles().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; metadata: Metadata; content: string }>;
}) {
    const { slug } = await params;

    const post = getArticles().find((post) => post.slug === slug);
    if (!post) {
        notFound();
    }

    const { title, updated: modifiedTime, description } = post;
    const fullTitle = `${title} | ${defaults.title}`;
    const ogImage = `${defaults.url}/og-image.png`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            modifiedTime,
            url: `${defaults.url}/articles/${post.slug}`,
            siteName: defaults.title,
            images: ogImage,
        },
        twitter: {
            card: "summary",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function Article({
    params,
}: {
    params: Promise<{ slug: string; metadata: Metadata; content: string }>;
}) {
    const { slug } = await params;

    const post = getArticles().find((post) => post.slug === slug);

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
                        dateModified: post.updated,
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
            <Card type="header" className="w-full max-w-(--breakpoint-lg) rounded-3xl border-2 shadow-md md:p-10">
                <Navbar />
                {post.updated && (
                    <h3 className="description text-muted-foreground mt-5 text-sm">
                        Updated: {formatDate(post.updated)}
                    </h3>
                )}
                <h1 className="title mt-2 text-4xl font-bold break-words lg:text-5xl">{post.title}</h1>
                <h2 className="description mt-3 mb-4 break-words">{post.description}</h2>
            </Card>
            <Card
                type="article"
                className="prose prose-slate dark:prose-invert max-[350px]:prose-sm w-full max-w-(--breakpoint-lg) flex-1 rounded-3xl border-2 shadow-md md:p-10"
            >
                <CustomMDX source={post.content} />
            </Card>
            <Footer className="max-w-(--breakpoint-lg)" />
        </>
    );
}
