"use client";

import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/use-clipboard";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";

export default function CopyButton({ raw }: { raw: string }) {
    const { isCopied, copy } = useClipboard();

    return (
        <Button disabled={isCopied} variant="ghost" size="none" className="h-8 w-8" onClick={() => copy(raw)}>
            <LuClipboard
                className={`absolute h-5 w-5 transition-opacity duration-500 ${isCopied ? "opacity-0" : ""}`}
            />
            <LuClipboardCheck className={`h-5 w-5 transition-opacity duration-500 ${isCopied ? "" : "opacity-0"}`} />
        </Button>
    );
}
