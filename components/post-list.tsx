import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/misc";
import React from "react";

const PostList = ({ maxPosts }: { maxPosts?: number }) => {
    const posts = maxPosts ? getBlogPosts().slice(0, maxPosts) : getBlogPosts();
    return (
        <div className="grid gap-4">
            {posts.map((post) => (
                <PostListItem key={post.slug} post={post}/>
            ))}
        </div>
    );
};

const PostListItem = ({post}: {post: any}) => (
    <>
        <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-row gap-3 rounded-3xl p-2 transition-all duration-150 ease-in-out hover:bg-slate-200 dark:hover:bg-slate-600 items-center">
            {post.metadata.image && (
                <Image className="ring-2 ring-slate-500 bg-slate-600 rounded-3xl" src={post.metadata.image} alt={post.metadata.title} width="80" height="80"/>
            )}
            <div className="grid">
                <p className="text-sm text-muted-foreground">{formatDate(post.metadata.date)}</p>
                <h3 className="text-lg font-medium break-all sm:break-normal line-clamp-2 sm:line-clamp-3">{post.metadata.title}</h3>
                <h4 className="line-clamp-2 break-all sm:break-normal">{post.metadata.description}</h4>
            </div>
        </Link>
    </>
);

export default PostList;