import { PostList } from "@/components/post-list";
import { Card } from "@/components/ui/card";
import { ContentTypes } from "@/types/blog";

export function Posts({ type }: { type: keyof typeof ContentTypes }) {
    return (
        <Card className="overflow-auto rounded-3xl border-2 shadow-md lg:h-full">
            <PostList type={type} />
        </Card>
    );
}
