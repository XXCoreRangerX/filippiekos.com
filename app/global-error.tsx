"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { LuCircleX } from "react-icons/lu";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <main className="flex h-screen flex-col items-center justify-center text-center">
                    <LuCircleX className="text-muted-foreground mb-2 size-10" />
                    <h1 className="text-8xl font-bold">Error</h1>
                    <h2 className="text-2xl">Something went wrong</h2>
                    <Button className="mt-5" onClick={() => reset()}>
                        Refresh
                    </Button>
                </main>
            </body>
        </html>
    );
}
