import React from "react";
import defaults from "@/constants/defaults";
import { Navbar } from "@/app/(posts)/_components/navbar";
import { PostList } from "@/components/post-list";

export function Footer({ type }: { type: 'articles' | 'blog' }) {
    return (
        <footer className="mt-10 justify-center items-center">
            <hr className="my-5 dark:border-slate-600 rounded-full"/>
            <PostList type={type} maxPosts={2}/>
            <hr className="my-5 dark:border-slate-600 rounded-full"/>
            <Navbar/>
            <p className="text-center text-muted-foreground dark:text-slate-400">
                &copy; {new Date().getFullYear()} {defaults.title}
            </p>
        </footer>
    );
}