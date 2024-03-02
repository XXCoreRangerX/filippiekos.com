import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const calloutVariants = cva("p-3 mb-4 rounded-lg border border-l-4", {
    variants: {
        variant: {
            callout: "bg-muted/50 border-muted dark:border-muted",
            warning:
                "bg-yellow-400/50 border-yellow-400 dark:bg-yellow-600/50 dark:border-yellow-500",
            danger: "bg-red-400/50 border-red-400 dark:bg-red-600/50 dark:border-red-500",
            success:
                "bg-emerald-400/50 border-emerald-400 dark:bg-emerald-600/50 dark:border-emerald-500",
        },
    },
    defaultVariants: {
        variant: "callout",
    },
});

export interface CalloutProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof calloutVariants> {}

const Callout: React.ForwardRefRenderFunction<HTMLDivElement, CalloutProps> = (
    { className, variant, title, children, ...props },
    ref,
) => {
    return (
        <div
            className={cn(calloutVariants({ variant }), className)}
            ref={ref}
            {...props}
        >
            {title && (
                <h3 className="not-prose text-lg font-bold capitalize">
                    {typeof title === "boolean" ? variant : title || variant}
                </h3>
            )}
            <div className="text-foreground">{children}</div>
        </div>
    );
};

Callout.displayName = "Callout";
export { Callout, calloutVariants };
