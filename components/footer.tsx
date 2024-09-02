import defaults from "@/app.config";
import { PostList } from "@/components/post-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContentTypes } from "@/types/blog";
import { cn } from "@/utils/cn";
import Link from "next/link";
import SearchBar from "./ui/searchbar";

export function Footer({ className, type }: { className?: string; type?: keyof typeof ContentTypes }) {
    return (
        <Card
            type="footer"
            variant="outline"
            className={cn("w-full items-center justify-center rounded-3xl shadow-md sm:p-8 md:p-10", className)}
        >
            {type && (
                <div>
                    <PostList type={type} maxPosts={2} />
                    <Separator className="my-5" />
                </div>
            )}
            <div className="flex items-center justify-between">
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                    &copy; {new Date().getFullYear()} {defaults.title}
                </Link>
                <div className="flex items-center gap-2">
                    <SearchBar variant="ghost" text={false} className="text-muted-foreground" />
                    <ThemeToggle className="text-muted-foreground" />
                </div>
            </div>
        </Card>
    );
}
