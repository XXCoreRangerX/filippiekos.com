"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

const themeToggleVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ring-blue-400",
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
                    <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

ThemeToggle.displayName = "Theme";

export { ThemeToggle, themeToggleVariants };
