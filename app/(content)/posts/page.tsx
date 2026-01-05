import { Navbar } from "@/components/blog/navbar";
import { Footer } from "@/components/footer";
import { PostList } from "@/components/post-list";
import { Badge } from "@/components/ui/badge";
import { getTags } from "@/utils/blogUtils";
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
            <header className="bg-card w-full max-w-(--breakpoint-lg) rounded-3xl border-2 p-5 shadow-md md:p-10">
                <Navbar />
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Link key={index} href={`/tags/${tag}`}>
                            <Badge variant="muted">{tag}</Badge>
                        </Link>
                    ))}
                </div>
            </header>
            <article className="bg-card w-full max-w-(--breakpoint-lg) flex-1 rounded-3xl border-2 p-5 shadow-md">
                <PostList type="posts" />
            </article>
            <Footer className="max-w-(--breakpoint-lg)" />
        </>
    );
}
