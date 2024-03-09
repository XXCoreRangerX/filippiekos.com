import { contentTypes, getArticles, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface PostListProps extends React.HTMLAttributes<HTMLDivElement> {
    type: keyof typeof contentTypes;
    maxPosts?: number;
    tag?: string;
}

const PostListItem = ({ post, type }: { post: any; type: keyof typeof contentTypes }) => (
    <Link
        key={post.slug}
        href={`/${type}/${post.slug}`}
        className="flex items-center gap-3 rounded-xl p-3 transition-all duration-150 ease-in-out hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
    >
        {post.image && (
            <Image
                className="h-16 w-16 rounded-xl bg-white object-contain ring-2 ring-ring"
                src={"/assets/posts/" + post.slug + post.image}
                alt={post.title}
                width="100"
                height="100"
                priority
            />
        )}
        <div className="grid">
            {post.date && <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>}
            <h3 className="line-clamp-2 text-lg font-medium sm:line-clamp-3">{post.title}</h3>
            {post.description && <h4 className="line-clamp-2">{post.description}</h4>}
        </div>
    </Link>
);

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
                    href={`/${type}`}
                    className="text-center text-lg font-semibold text-muted-foreground transition duration-200 ease-in-out hover:text-foreground active:text-slate-400 dark:active:text-slate-600"
                >
                    All posts
                </Link>
            )}
        </div>
    );
});
PostList.displayName = "PostList";

export { PostList, PostListItem };
