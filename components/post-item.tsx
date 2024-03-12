import { Card } from "@/components/ui/card";
import { contentTypes } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";

export const PostListItem = ({ post, type }: { post: any; type: keyof typeof contentTypes }) => (
    <Link key={post.slug} href={`/${type}/${post.slug}`}>
        <Card variant="outline" hover className="flex items-center gap-3 border-none p-3">
            {post.image && (
                <Image
                    className="h-16 w-16 rounded-xl bg-white object-contain ring-2 ring-ring"
                    src={"/assets/posts/" + post.slug + post.image}
                    alt={post.title}
                    width="100"
                    height="100"
                    priority
                />
            )}
            <div className="grid">
                {post.date && <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>}
                <h3 className="line-clamp-2 text-lg font-medium sm:line-clamp-3">{post.title}</h3>
                {post.description && <h4 className="line-clamp-2">{post.description}</h4>}
            </div>
        </Card>
    </Link>
);
