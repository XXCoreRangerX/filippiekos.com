import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export function Navbar() {
    return (
        <div className="mb-5 flex items-center justify-between">
            <Link
                className={cn(
                    "items-center",
                    buttonVariants({ variant: "linkSecondary", size: "none" }),
                )}
                href="/"
            >
                <FaChevronLeft size="24" className="mr-2" />
                <span className="text-lg">Home</span>
            </Link>
            <ThemeToggle />
        </div>
    );
}
