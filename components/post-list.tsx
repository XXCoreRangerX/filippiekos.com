import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/misc";

export interface PostListProps extends React.HTMLAttributes<HTMLDivElement> {
    maxPosts?: number;
    hideImage?: boolean;
}

const PostListItem = ({post, hideImage}: {post: any, hideImage?: boolean}) => (
    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-row gap-3 rounded-3xl p-2 transition-all duration-150 ease-in-out hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 items-center">
        {!hideImage && post.metadata.image && (
            <Image className="ring-2 ring-slate-500 bg-slate-600 rounded-3xl" src={post.metadata.image} alt={post.metadata.title} width="80" height="80"/>
        )}
        <div className="grid">
            {post.metadata.date && (
                <p className="text-sm text-muted-foreground">{formatDate(post.metadata.date)}</p>
            )}
            <h3 className="text-lg font-medium break-all sm:break-normal line-clamp-2 sm:line-clamp-3">{post.metadata.title}</h3>
            {post.metadata.description && (
                <h4 className="line-clamp-2 break-all sm:break-normal">{post.metadata.description}</h4>
            )}
        </div>
    </Link>
);

const PostList = React.forwardRef<HTMLDivElement, PostListProps>(({maxPosts, hideImage, ...props}, ref) => {
        const posts = maxPosts ? getBlogPosts().slice(0, maxPosts) : getBlogPosts();
        return (
            <div ref={ref} className="grid gap-4">
                {posts.map((post) => (
                    <PostListItem key={post.slug} post={post} hideImage={hideImage}/>
                ))}
                {maxPosts && (
                    <Link href="/blog" className="font-semibold text-muted-foreground active:text-slate-400 dark:active:text-slate-600 transition ease-in-out duration-200 hover:text-foreground text-center text-lg">
                        All posts
                    </Link>
                )}
            </div>
        );
    }
);
PostList.displayName = "PostList";

export { PostList, PostListItem }