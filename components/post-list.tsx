import { PostListItem } from "@/components/post-item";
import { ContentTypes } from "@/types/blog";
import { getSortedArticles, getSortedPosts } from "@/utils/blogUtils";
import Link from "next/link";
import React from "react";

export interface PostListProps extends React.HTMLAttributes<HTMLDivElement> {
    type: keyof typeof ContentTypes;
    maxPosts?: number;
    tag?: string;
}

const PostList = React.forwardRef<HTMLDivElement, PostListProps>(({ type, maxPosts, tag }, ref) => {
    const posts =
        type === "articles" ? getSortedArticles() : getSortedPosts().filter((post) => !tag || post.tags?.includes(tag));
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
