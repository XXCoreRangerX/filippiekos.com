import { getArticles, getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";
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
        className="flex items-center gap-3 rounded-xl p-3 transition-all duration-150 ease-in-out hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
    >
        {post.metadata.image && (
            <Image
                className="rounded-3xl bg-slate-600 ring-2 ring-ring"
                src={post.metadata.image}
                alt={post.metadata.title}
                width="80"
                height="80"
            />
        )}
        <div className="grid">
            {type === "blog" && post.metadata.date && (
                <p className="text-sm text-muted-foreground">
                    {formatDate(post.metadata.date)}
                </p>
            )}
            <h3 className="line-clamp-2 text-lg font-medium sm:line-clamp-3">
                {post.metadata.title}
            </h3>
            {post.metadata.description && (
                <h4 className="line-clamp-2">{post.metadata.description}</h4>
            )}
        </div>
    </Link>
);

const PostList = React.forwardRef<HTMLDivElement, PostListProps>(
    ({ type, maxPosts }, ref) => {
        const posts =
            type === "articles"
                ? getArticles().sort(
                      (a, b) =>
                          (a.metadata.order || 0) - (b.metadata.order || 0),
                  )
                : getBlogPosts().sort(
                      (a, b) =>
                          new Date(b.metadata.date || "").getTime() -
                          new Date(a.metadata.date || "").getTime(),
                  );
        const filteredPosts = maxPosts ? posts.slice(0, maxPosts) : posts;
        return (
            <div ref={ref} className="grid gap-2">
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
