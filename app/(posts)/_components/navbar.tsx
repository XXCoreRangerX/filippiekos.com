import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export function Navbar() {
    return (
        <div className="mb-5 flex items-center justify-between">
            <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-muted-foreground transition duration-200 ease-in-out hover:text-foreground active:text-slate-400 dark:active:text-slate-600"
            >
                <FaChevronLeft size="24" />
                <span className="text-lg">Home</span>
            </Link>
            <ThemeToggle />
        </div>
    );
}
