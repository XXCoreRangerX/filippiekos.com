import { PostListItem } from "@/components/post-item";
import { contentTypes, getArticles, getPosts } from "@/lib/blog";
import Link from "next/link";
import React from "react";

export interface PostListProps extends React.HTMLAttributes<HTMLDivElement> {
    type: keyof typeof contentTypes;
    maxPosts?: number;
    tag?: string;
}

const PostList = React.forwardRef<HTMLDivElement, PostListProps>(({ type, maxPosts, tag }, ref) => {
    const posts =
        type === "articles"
            ? getArticles().sort((a, b) => (a.order || 0) - (b.order || 0))
            : getPosts()
                  .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
                  .filter((post) => !tag || post.tags?.includes(tag));
    const filteredPosts = maxPosts ? posts.slice(0, maxPosts) : posts;
    return (
        <div ref={ref} className="grid gap-2">
            {filteredPosts.map((post) => (
                <PostListItem key={post.slug} post={post} type={type} />
            ))}
            {maxPosts && (
                <Link
                    href={`/`}
                    className="text-center text-lg font-semibold text-muted-foreground transition duration-200 ease-in-out hover:text-foreground active:text-slate-400 dark:active:text-slate-600"
                >
                    All posts
                </Link>
            )}
        </div>
    );
});
PostList.displayName = "PostList";

export { PostList };