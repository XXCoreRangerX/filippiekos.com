import { Card } from "@/components/ui/card";
import { ContentTypes } from "@/types/blog";
import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

export const PostListItem = ({ post, type }: { post: any; type: keyof typeof ContentTypes }) => (
    <Link key={post.slug} href={`/${type}/${post.slug}`}>
        <Card variant="clear" hover className="group flex items-center gap-3 border-none p-3">
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
            <div className="grid gap-1">
                {post.date && (
                    <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">{formatDate(post.date)}</p>
                )}
                <h3 className="line-clamp-2 items-center text-lg font-medium sm:line-clamp-3">
                    {post.title}
                    <LuArrowUpRight className="inline-block h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>
                {post.description && <h4 className="line-clamp-2">{post.description}</h4>}
            </div>
        </Card>
    </Link>
);
