import { PostList } from "@/components/post-list";
import { contentTypes } from "@/lib/blog";

export function Posts({ type }: { type: keyof typeof contentTypes }) {
    return (
        <section className="overflow-auto rounded-3xl border-2 bg-card p-5 shadow-md lg:h-full">
            <PostList type={type} />
        </section>
    );
}
