"use client";

import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { LuCircleX } from "react-icons/lu";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <main className="flex h-screen flex-col items-center justify-center p-5 text-center">
            <LuCircleX className="mb-2 h-10 w-10 text-muted-foreground" />
            <h1 className="text-8xl font-bold">Error</h1>
            <h2 className="mb-2 text-2xl">Something went wrong</h2>
            <Button onClick={() => reset()}>Refresh</Button>
        </main>
    );
}
