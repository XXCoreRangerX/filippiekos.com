import { Navbar } from "@/app/(posts)/_components/navbar";
import { PostList } from "@/components/post-list";
import { Separator } from "@/components/ui/separator";
import defaults from "@/constants/defaults";

export function Footer({ type }: { type: "articles" | "blog" }) {
    return (
        <footer className="mt-10 items-center justify-center">
            {type === "blog" && (
                <div>
                    <Separator className="my-5" />
                    <PostList type={type} maxPosts={2} />
                </div>
            )}
            <Separator className="my-5" />
            <Navbar />
            <p className="text-center text-muted-foreground">
                &copy; {new Date().getFullYear()} {defaults.title}
            </p>
        </footer>
    );
}
