import { GridBackground } from "@/components/grid-background";
import { SearchCommand } from "@/components/search-command";
import { PAGE_METADATA, PAGE_VIEWPORT } from "@/next.dynamic";
import { fontMono, fontSans, fontSerif } from "@/next.fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

export const viewport: Viewport = { ...PAGE_VIEWPORT };
export const metadata: Metadata = { ...PAGE_METADATA };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${fontMono.variable} ${fontSans.variable} ${fontSerif.variable}`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <GridBackground />
                    {children}
                    <SearchCommand />
                    <SpeedInsights />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
