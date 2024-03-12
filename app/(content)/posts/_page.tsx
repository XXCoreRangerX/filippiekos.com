import { Navbar } from "@/app/(content)/_components/navbar";
import { Footer } from "@/components/footer";
import { PostList } from "@/components/post-list";
import { Badge } from "@/components/ui/badge";
import { getTags } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Posts",
    description: "Read my thoughts on software development, design, and more.",
};

export default function Posts() {
    const tags = getTags();
    return (
        <>
            <header className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-5 shadow-md md:p-10">
                <Navbar />
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Link key={index} href={`/tags/${tag}`}>
                            <Badge variant="muted">{tag}</Badge>
                        </Link>
                    ))}
                </div>
            </header>
            <article className="w-full max-w-screen-lg flex-1 rounded-3xl border-2 bg-card p-5 shadow-md">
                <PostList type="posts" />
            </article>
            <Footer className="max-w-screen-lg" />
        </>
    );
}
