"use client";

import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { XCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <div className="flex h-screen flex-col items-center justify-center text-center">
            <XCircle className="mb-2 h-10 w-10 text-muted-foreground" />
            <h1 className="text-8xl font-bold">Error</h1>
            <h2 className="text-2xl">Something went wrong</h2>
            <Button className="mt-5" onClick={() => reset()}>
                Refresh
            </Button>
        </div>
    );
}
