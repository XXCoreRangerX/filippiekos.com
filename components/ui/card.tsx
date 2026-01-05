import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const CardVariants = cva(
    "rounded-xl border shadow-xs p-5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    {
        variants: {
            type: {
                aside: "aside",
                article: "article",
                header: "header",
                nav: "nav",
                section: "section",
                footer: "footer",
            },
            variant: {
                default: "bg-card",
                outline: "bg-transparent",
                clear: "bg-transparent border-none shadow-none",
                secondary: "bg-secondary text-secondary-foreground",
            },
            hover: {
                true: "transition-all ease-in-out active:bg-slate-300 hover:bg-muted dark:active:bg-slate-600",
            },
        },
        defaultVariants: {
            type: "section",
            variant: "default",
            hover: false,
        },
    },
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof CardVariants> {
    hover?: boolean;
}

function Card({ className, type, hover = false, variant, ...props }: CardProps) {
    const Comp = type || "section";
    return <Comp className={cn(CardVariants({ hover, variant: variant }), className)} {...props} />;
}

export { Card };
