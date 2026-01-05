"use client";

import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/use-clipboard";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";

export default function CopyButton({ raw }: { raw: string }) {
    const { isCopied, copy } = useClipboard();

    return (
        <Button disabled={isCopied} variant="ghost" size="none" className="size-8" onClick={() => copy(raw)}>
            <LuClipboard className={`absolute size-5 transition-opacity duration-500 ${isCopied ? "opacity-0" : ""}`} />
            <LuClipboardCheck className={`size-5 transition-opacity duration-500 ${isCopied ? "" : "opacity-0"}`} />
        </Button>
    );
}
