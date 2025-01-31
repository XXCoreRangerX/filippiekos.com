import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { IconType } from "react-icons";
import { LuCheck, LuCircleAlert, LuInfo, LuTriangleAlert } from "react-icons/lu";

const calloutVariants = cva("p-3 mb-4 rounded-lg border-2 border-l-[0.4rem]", {
    variants: {
        variant: {
            note: "bg-muted/50 border-muted",
            warning: "bg-yellow-400/50 border-yellow-500 dark:bg-yellow-600/50",
            danger: "bg-destructive/40 border-red-500 dark:bg-destructive/80",
            success: "bg-emerald-400/50 border-emerald-500 dark:bg-emerald-600/50",
        },
    },
    defaultVariants: {
        variant: "note",
    },
});

const variantColors = {
    note: "text-muted-foreground",
    warning: "text-yellow-500",
    danger: "text-red-500",
    success: "text-emerald-500",
};

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof calloutVariants> {
    name?: boolean | string;
}

function Callout({ className, variant = "note", name, children, ...props }: CalloutProps) {
    const colorClass = variant ? variantColors[variant] : "text-muted-foreground";
    const Icon: IconType = {
        note: LuInfo,
        warning: LuTriangleAlert,
        danger: LuCircleAlert,
        success: LuCheck,
    }[variant || "note"];

    return (
        <div className={cn(calloutVariants({ variant }), className)} {...props}>
            {name && (
                <div className="inline-flex w-full items-center gap-2">
                    <Icon className={cn("h-5 w-5", colorClass)} />
                    <h3
                        className={cn(
                            "not-prose max-[350px]:text-md text-lg font-bold capitalize lg:text-xl",
                            colorClass,
                        )}
                    >
                        {typeof name === "boolean" ? variant : name || variant}
                    </h3>
                </div>
            )}
            <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>
        </div>
    );
}

Callout.displayName = "Callout";

export default Callout;
