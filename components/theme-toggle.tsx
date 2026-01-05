"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";
import * as React from "react";
import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";

const themeToggleVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 ring-blue-400",
    {
        variants: {
            variant: {
                default: "",
                fixed: "fixed bottom-3 right-3 lg:bottom-1.5 lg:right-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface ThemeToggleProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof themeToggleVariants> {}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(({ className, variant, ...props }, ref) => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant === "fixed" ? "outline" : "ghost"}
                    size="icon"
                    className={themeToggleVariants({ variant, className })}
                    ref={ref}
                    {...props}
                >
                    <LuSun className="size-6 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
                    <LuMoon className="absolute size-6 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <LuSun className="mr-2 size-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <LuMoon className="mr-2 size-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <LuMonitor className="mr-2 size-4" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

ThemeToggle.displayName = "Theme";

export { ThemeToggle, themeToggleVariants };
