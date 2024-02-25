import { PostList } from "@/components/post-list";

export function Articles() {
    return (
        <div className="grid flex-col gap-3 overflow-auto rounded-3xl border-2 bg-card p-5 shadow-md lg:flex lg:h-screen">
            <div className="flex flex-col gap-2">
                <PostList type="articles" />
            </div>
        </div>
    );
}
