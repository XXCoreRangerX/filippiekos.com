import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

// link default as /
export function Navbar({ link = "/" }: { link?: string }) {
    return (
        <div className="flex items-center justify-between">
            <Link
                className={cn(
                    "items-center",
                    buttonVariants({ variant: "linkSecondary", size: "none" }),
                )}
                href={link}
            >
                <FaChevronLeft size="24" className="mr-2" />
                <span className="text-lg capitalize">
                    {link === "/"
                        ? "home"
                        : link
                              .trim()
                              .replace(/^\//, "")
                              .replace(/\/$/, "")
                              .replace(/-/g, " ")}
                </span>
            </Link>
            <ThemeToggle />
        </div>
    );
}