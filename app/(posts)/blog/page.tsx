import { Navbar } from "@/app/(posts)/_components/navbar";
import { PostList } from "@/components/post-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read my thoughts on software development, design, and more.",
};

export default function Blog() {
    return (
        <div className="grid min-h-screen p-5">
            <div className="gap-5 rounded-3xl border-2 bg-card p-5 shadow-md">
                <Navbar />
                <PostList type="blog" />
            </div>
        </div>
    );
}
