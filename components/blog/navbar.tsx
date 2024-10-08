import { buttonVariants } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchbar";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export function Navbar({ link = "/" }: { link?: string }) {
    return (
        <nav className="flex items-center justify-between gap-5">
            <Link
                className={cn("items-center", buttonVariants({ variant: "linkSecondary", size: "none" }))}
                href={link}
            >
                <FaChevronLeft size="24" className="mr-2" />
                <span className="text-lg capitalize">
                    {link === "/" ? "home" : link.trim().replace(/^\//, "").replace(/\/$/, "").replace(/-/g, " ")}
                </span>
            </Link>
            <SearchBar className="max-w-40" />
        </nav>
    );
}
