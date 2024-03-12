import { PostList } from "@/components/post-list";
import { Card } from "@/components/ui/card";
import { contentTypes } from "@/lib/blog";

export function Posts({ type }: { type: keyof typeof contentTypes }) {
    return (
        <Card className="overflow-auto rounded-3xl border-2 shadow-md lg:h-full">
            <PostList type={type} />
        </Card>
    );
}
