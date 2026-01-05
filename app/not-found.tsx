"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LuCircleX } from "react-icons/lu";

export default function NotFound() {
    return (
        <main className="flex h-screen flex-col items-center justify-center p-5 text-center">
            <LuCircleX className="text-muted-foreground mb-2 size-10" />
            <h1 className="text-8xl font-bold">404</h1>
            <h2 className="mb-2 text-2xl">Not Found</h2>
            <Link className={buttonVariants()} href="/">
                Go back
            </Link>
        </main>
    );
}
