import { Navbar } from "@/app/(content)/_components/navbar";
import { Footer } from "@/components/footer";
import { PostList } from "@/components/post-list";
import { Badge } from "@/components/ui/badge";
import { getTags, saveDataToJson } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    saveDataToJson(getTags(), "data/tags.json");
    return getTags().map((tag) => ({ tag }));
}

export const metadata: Metadata = {
    title: "Tags",
    description: "Read my thoughts on software development, design, and more.",
};

export default function Tag({ params }: { params: { tag: string } }) {
    return (
        <>
            <header className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-5 shadow-md md:p-10">
                <Navbar link="/posts" />
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/tags/${params.tag}`}>
                        <Badge variant="muted">{params.tag}</Badge>
                    </Link>
                </div>
            </header>
            <article className="w-full max-w-screen-lg flex-1 rounded-3xl border-2 bg-card p-5 shadow-md">
                <PostList type="posts" tag={params.tag} />
            </article>
            <Footer className="max-w-screen-lg" />
        </>
    );
}
