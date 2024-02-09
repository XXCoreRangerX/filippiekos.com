import { Navbar } from "@/app/(posts)/_components/navbar";
import { PostList } from "@/components/post-list";
import defaults from "@/constants/defaults";

export function Footer({ type }: { type: "articles" | "blog" }) {
    return (
        <footer className="mt-10 items-center justify-center">
            <hr className="my-5 rounded-full dark:border-slate-600" />
            <PostList type={type} maxPosts={2} />
            <hr className="my-5 rounded-full dark:border-slate-600" />
            <Navbar />
            <p className="text-center text-muted-foreground dark:text-slate-400">
                &copy; {new Date().getFullYear()} {defaults.title}
            </p>
        </footer>
    );
}
