import { Footer } from "@/app/(content)/_components/footer";
import { Navbar } from "@/app/(content)/_components/navbar";
import { Badge } from "@/components/ui/badge";
import { getTags } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tags",
    description: "Read my thoughts on software development, design, and more.",
};

export default function Tags() {
    const tags = getTags();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-5 sm:p-8 sm:px-24 lg:p-10">
            <div className="w-full max-w-screen-lg rounded-3xl border-2 bg-card p-6 shadow-md md:p-10">
                <Navbar link="/blog" />
            </div>
            <div className="w-full max-w-screen-lg flex-1 rounded-3xl border-2 bg-card p-6 shadow-md md:p-10">
                <div className="mb-4 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Link key={index} href={`/tags/${tag}`}>
                            <Badge variant="muted">{tag}</Badge>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="w-full max-w-screen-lg rounded-3xl border-2 p-6 shadow-md md:p-10">
                <Footer />
            </div>
        </div>
    );
}
