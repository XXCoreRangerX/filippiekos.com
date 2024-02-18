import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center text-center">
            <XCircle className="mb-2 h-10 w-10 text-muted-foreground" />
            <h1 className="text-8xl font-bold">404</h1>
            <h2 className="text-2xl">Not Found</h2>
            <Link className={cn("mt-5", buttonVariants())} href="/">
                Go back
            </Link>
        </div>
    );
}
