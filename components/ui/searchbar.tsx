"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import useDetectOS from "@/hooks/use-os";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/utils/cn";
import { LuSearch } from "react-icons/lu";

export default function SearchBar({ variant = "outline", className, text = true }: ButtonProps & { text?: boolean }) {
    const toggle = useSearch((store) => store.toggle);

    const { os } = useDetectOS();
    const cmdKey = os === "MAC" ? "⌘" : "Ctrl ";

    return (
        <Button
            variant={variant}
            onClick={toggle}
            size="icon"
            className={cn("mr-1 w-fit items-center justify-between gap-4 bg-transparent px-2", className)}
            aria-label="Search"
            aria-haspopup="dialog"
            role="button"
        >
            <span className="inline-flex items-center gap-2">
                <LuSearch className="h-6 w-6" />
                {text && <span className="max-[384px]:hidden">Search</span>}
                <span className="sr-only">Search button</span>
            </span>
            {text && <kbd className="max-md:hidden">{cmdKey}K</kbd>}
        </Button>
    );
}
