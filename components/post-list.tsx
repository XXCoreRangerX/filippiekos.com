import { getArticles, getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/misc";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface PostListProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "blog" | "articles";
    maxPosts?: number;
}

const PostListItem = ({
    post,
    type,
}: {
    post: any;
    type: "blog" | "articles";
}) => (
    <Link
        key={post.slug}
        href={`/${type}/${post.slug}`}
        className="flex flex-row items-center gap-3 rounded-3xl p-2 transition-all duration-150 ease-in-out hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
    >
        {post.metadata.image && (
            <Image
                className="rounded-3xl bg-slate-600 ring-2 ring-slate-500"
                src={post.metadata.image}
                alt={post.metadata.title}
                width="80"
                height="80"
            />
        )}
        <div className="grid">
            {post.metadata.date && (
                <p className="text-sm text-muted-foreground">
                    {formatDate(post.metadata.date)}
                </p>
            )}
            <h3 className="line-clamp-2 break-all text-lg font-medium sm:line-clamp-3 sm:break-normal">
                {post.metadata.title}
            </h3>
            {post.metadata.description && (
                <h4 className="line-clamp-2 break-all sm:break-normal">
                    {post.metadata.description}
                </h4>
            )}
        </div>
    </Link>
);

const PostList = React.forwardRef<HTMLDivElement, PostListProps>(
    ({ type, maxPosts }, ref) => {
        const posts = type === "articles" ? getArticles() : getBlogPosts();
        const filteredPosts = maxPosts ? posts.slice(0, maxPosts) : posts;
        return (
            <div ref={ref} className="grid gap-4">
                {filteredPosts.map((post) => (
                    <PostListItem key={post.slug} post={post} type={type} />
                ))}
                {maxPosts && (
                    <Link
                        href={`/${type}`}
                        className="text-center text-lg font-semibold text-muted-foreground transition duration-200 ease-in-out hover:text-foreground active:text-slate-400 dark:active:text-slate-600"
                    >
                        All posts
                    </Link>
                )}
            </div>
        );
    },
);
PostList.displayName = "PostList";

export { PostList, PostListItem };
