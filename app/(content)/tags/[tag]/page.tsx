import { Footer } from "@/app/(content)/_components/footer";
import { Navbar } from "@/app/(content)/_components/navbar";
import { PostList } from "@/components/post-list";
import { Badge } from "@/components/ui/badge";
import { getTags, saveDataToJson } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    saveDataToJson(getTags(), "data/tags.json");
    return getTags().map((tag) => ({ tag }));
}

export const metadata: Metadata = {
    title: "Tags",
    description: "Read my thoughts on software development, design, and more.",
};

export default function Tag({ params }: { params: { tag: string } }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-5 sm:p-8 sm:px-24 lg:p-10">
            <div className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-6 shadow-md md:p-10">
                <Navbar link="/tags" />
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/tags/${params.tag}`}>
                        <Badge variant="muted">{params.tag}</Badge>
                    </Link>
                </div>
            </div>
            <div className="w-full max-w-screen-lg flex-1 rounded-3xl border-2 bg-card p-5 shadow-md">
                <PostList type="blog" tag={params.tag} />
            </div>
            <div className="w-full max-w-screen-lg rounded-3xl border-2 p-6 shadow-md md:p-10">
                <Footer />
            </div>
        </div>
    );
}
