import type { Metadata } from "next";
import PostList from "@/components/post-list";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read my thoughts on software development, design, and more.',
};

export default function Blog() {
    return (
        <div className="grid p-5 min-h-screen">
            <div className="gap-5 p-5 bg-secondary border-2 dark:border-slate-700 rounded-3xl shadow-md">
                <PostList/>
            </div>
        </div>
    );
}