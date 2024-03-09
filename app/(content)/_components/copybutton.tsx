"use client";

import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ raw }: { raw: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <Button disabled={isCopied} variant="ghost" size="none" className="h-8 w-8" onClick={() => copy(raw)}>
            <Clipboard className={`absolute h-5 w-5 transition-all duration-500 ${isCopied ? "opacity-0" : ""}`} />
            <ClipboardCheck className={`h-5 w-5 transition-all duration-500 ${isCopied ? "" : "opacity-0"}`} />
        </Button>
    );
}
