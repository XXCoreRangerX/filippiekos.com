import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const calloutVariants = cva("p-3 mb-4 rounded-lg border border-l-4", {
    variants: {
        variant: {
            callout: "bg-muted/50 border-muted",
            warning: "bg-yellow-400/50 border-yellow-500 dark:bg-yellow-600/50",
            danger: "bg-destructive/40 border-red-500 dark:bg-destructive/80",
            success: "bg-emerald-400/50 border-emerald-500 dark:bg-emerald-600/50",
        },
    },
    defaultVariants: {
        variant: "callout",
    },
});

const variantColors = {
    callout: "text-muted-foreground",
    warning: "text-yellow-500",
    danger: "text-red-500",
    success: "text-emerald-500",
};

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof calloutVariants> {
    name?: boolean | string;
}

function Callout({ className, variant, name, children, ...props }: CalloutProps) {
    const colorClass = variant ? variantColors[variant] : "text-muted-foreground";
    return (
        <div className={cn(calloutVariants({ variant }), className)} {...props}>
            {name && (
                <h3 className={cn("not-prose max-[350px]:text-md text-lg font-bold capitalize lg:text-xl", colorClass)}>
                    {typeof name === "boolean" ? variant : name || variant}
                </h3>
            )}
            <div className="text-foreground">{children}</div>
        </div>
    );
}
Callout.displayName = "Callout";

export default Callout;
