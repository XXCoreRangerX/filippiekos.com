import { Navbar } from "@/components/blog/navbar";
import { Footer } from "@/components/footer";
import { PostList } from "@/components/post-list";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getTags, saveDataToJson } from "@/utils/blogUtils";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    saveDataToJson(getTags(), "content/data/tags.json");
    return getTags().map((tag) => ({ tag }));
}

export const metadata: Metadata = {
    title: "Tags",
    description: "Read my thoughts on software development, design, and more.",
};

export default async function Tag({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    return (
        <>
            <Card type="header" className="w-full max-w-screen-lg rounded-3xl border-2 shadow-md md:p-10">
                <Navbar link="/" />
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/tags/${tag}`}>
                        <Badge variant="muted">{tag}</Badge>
                    </Link>
                </div>
            </Card>
            <Card type="article" className="w-full max-w-screen-lg flex-1 rounded-3xl border-2 shadow-md">
                <PostList type="posts" tag={tag} />
            </Card>
            <Footer className="max-w-screen-lg" />
        </>
    );
}
