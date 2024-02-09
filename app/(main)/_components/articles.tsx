import { PostList } from "@/components/post-list";

export function Articles() {
    return (
        <div className="grid md:flex flex-col bg-secondary border-2 dark:border-slate-700 rounded-3xl p-5 gap-3 shadow-md overflow-auto md:h-screen">
            <div className="flex flex-col gap-2">
                <PostList type="articles"/>
            </div>
        </div>
    );
}