"use client";

import { useState } from "react";

const useClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return { isCopied, copy };
};

export default useClipboard;
