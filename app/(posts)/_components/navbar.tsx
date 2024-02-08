import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

export function Navbar() {
    return (
        <div className="flex items-center mb-5 justify-between">
            <Link href="/" className="flex font-semibold items-center text-muted-foreground active:text-slate-400 dark:active:text-slate-600 transition ease-in-out duration-200 gap-2 hover:text-foreground">
                <FaChevronLeft size="24"/>
                <span className="text-lg">Home</span>
            </Link>
            <ThemeToggle/>
        </div>
    );
}