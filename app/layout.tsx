import { GridBackground } from "@/components/grid-background";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SearchCommand } from "@/components/search-command";
import defaults from "@/constants/defaults";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono as FontMono, Rubik as FontSans, Domine as FontSerif } from "next/font/google";
import React from "react";
import "./globals.css";

const fontMono = FontMono({ subsets: ["latin"], variable: "--font-mono" });
const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontSerif = FontSerif({ subsets: ["latin"], variable: "--font-serif" });

export const viewport: Viewport = {
    // TODO: themeColor based on current website theme and not user's system theme
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(defaults.url),
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-US",
            "pl-PL": "/pl-PL",
        },
    },
    title: defaults.title,
    description: defaults.description,
    openGraph: {
        title: defaults.title,
        description: defaults.description,
        url: defaults.url,
        siteName: defaults.title,
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: defaults.title,
        card: "summary_large_image",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${fontMono.variable} ${fontSans.variable} ${fontSerif.variable} relative font-sans antialiased`}
            >
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
