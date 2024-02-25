import { ThemeProvider } from "@/components/providers/theme-provider";
import { SearchCommand } from "@/components/search-command";
import defaults from "@/constants/defaults";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Rubik as Font } from "next/font/google";
import React from "react";
import "./globals.css";

const font = Font({ subsets: ["latin"] });

export const viewport: Viewport = {
    themeColor: "#0f172a",
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
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${font.className} relative antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="absolute inset-0 -z-[100] bg-[linear-gradient(to_right,#6b7280_1px,transparent_2px),linear-gradient(to_bottom,#6b7280_1px,transparent_2px)] opacity-5 [background-position:10px_10px] [background-size:30px_30px] [mask-image:radial-gradient(ellipse,#000_75%,transparent_100%)]" />
                    {children}
                    <SpeedInsights />
                    <Analytics />
                    <SearchCommand />
                </ThemeProvider>
            </body>
        </html>
    );
}
