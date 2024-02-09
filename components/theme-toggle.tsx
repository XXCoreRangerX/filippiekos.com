"use client";

import { Button as UIButton } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

const themeToggleVariants = cva(
    "outline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "",
                fixed: "fixed bottom-5 right-5",
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

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
    ({ className, variant, ...props }, ref) => {
        const { setTheme } = useTheme();

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <UIButton
                        variant="theme"
                        size="icon"
                        className={cn(
                            themeToggleVariants({ variant, className }),
                        )}
                        ref={ref}
                        {...props}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </UIButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
);

ThemeToggle.displayName = "Theme";

export { ThemeToggle, themeToggleVariants };
