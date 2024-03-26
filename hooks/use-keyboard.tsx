"use client";

import { useEffect } from "react";

export function useKeyboardShortcut(key: string, handler: (e: KeyboardEvent) => void) {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === key && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handler(e);
            }
        };

        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, [key, handler]);
}
