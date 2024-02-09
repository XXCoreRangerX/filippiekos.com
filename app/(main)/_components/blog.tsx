import { PostList } from "@/components/post-list";

export function Blog() {
    return (
        <div className="grid flex-col gap-3 overflow-auto rounded-3xl border-2 bg-secondary p-5 shadow-md dark:border-slate-700 md:flex md:h-screen">
            <div className="flex flex-col gap-2">
                <PostList type="blog" />
            </div>
        </div>
    );
}
