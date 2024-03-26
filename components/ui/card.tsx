import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const CardVariants = cva(
    "rounded-xl border shadow-sm p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, type, hover = false, variant, ...props }, ref) => {
        const Comp = type || "section";
        return <Comp ref={ref} className={cn(CardVariants({ hover, variant: variant }), className)} {...props} />;
    },
);

Card.displayName = "Card";

export { Card };
