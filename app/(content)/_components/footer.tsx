import { Navbar } from "@/app/(content)/_components/navbar";
import { PostList } from "@/components/post-list";
import { Separator } from "@/components/ui/separator";
import defaults from "@/constants/defaults";
import { contentTypes } from "@/lib/blog";

export function Footer({ type }: { type?: keyof typeof contentTypes }) {
    return (
        <footer className="items-center justify-center">
            {type && (
                <div>
                    <PostList type={type} maxPosts={2} />
                    <Separator className="my-5" />
                </div>
            )}
            <Navbar />
            <p className="mt-2 text-center text-muted-foreground">
                &copy; {new Date().getFullYear()} {defaults.title}
            </p>
        </footer>
    );
}
