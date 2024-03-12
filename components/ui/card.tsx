import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const CardVariants = cva("rounded-xl border bg-card shadow-sm p-5", {
    variants: {
        variant: {
            default: "bg-card",
            outline: "bg-transparent",
            secondary: "bg-secondary text-secondary-foreground",
        },
        hover: {
            true: "transition-all duration-150 ease-in-out hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700/50 dark:active:bg-slate-600",
        },
    },
    defaultVariants: {
        variant: "default",
        hover: false,
    },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof CardVariants> {
    hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, hover = false, variant, ...props }, ref) => (
    <div ref={ref} className={cn(CardVariants({ hover, variant: variant }), className)} {...props} />
));
Card.displayName = "Card";

export { Card };
