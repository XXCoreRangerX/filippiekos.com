"use client";

import { buttonVariants } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const path = usePathname();
    return (
        <main className="flex h-screen flex-col items-center justify-center p-5 text-center">
            {path !== "/wp-admin" && (
                <>
                    <XCircle className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h1 className="text-8xl font-bold">404</h1>
                    <h2 className="mb-2 text-2xl">Not Found</h2>
                </>
            )}
            {path === "/wp-admin" && (
                <>
                    <div className="mb-2 animate-spin text-3xl">🤡</div>
                    <Callout name="Woah there!" variant="danger">
                        we don&apos;t use WordPress around here lmao
                    </Callout>
                </>
            )}
            <Link className={buttonVariants()} href="/">
                Go back
            </Link>
        </main>
    );
}
