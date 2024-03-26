"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import useDetectOS from "@/hooks/use-os";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/utils/cn";
import { LuSearch } from "react-icons/lu";

export default function SearchBar({ variant = "outline", className }: ButtonProps) {
    const toggle = useSearch((store) => store.toggle);

    const { os } = useDetectOS();
    const cmdKey = os === "MAC" ? "⌘" : "Ctrl ";

    return (
        <Button
            variant={variant}
            onClick={toggle}
            className={cn("h-12 items-center justify-between gap-2 bg-transparent px-3", className)}
        >
            <span className="inline-flex items-center gap-2">
                <LuSearch />
                Search
            </span>
            <kbd className="max-md:hidden">{cmdKey}K</kbd>
        </Button>
    );
}
