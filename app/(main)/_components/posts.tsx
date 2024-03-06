import { PostList } from "@/components/post-list";

export function Posts() {
    return (
        <div className="grid max-h-screen flex-col gap-3 overflow-auto rounded-3xl border-2 bg-card p-5 shadow-md lg:flex lg:h-screen">
            <PostList type="posts" />
        </div>
    );
}