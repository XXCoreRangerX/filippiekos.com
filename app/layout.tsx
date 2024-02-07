import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { Rubik as Font } from "next/font/google";
import defaults from "@/constants/defaults";
import React from "react";

const font = Font({subsets: ["latin"]});

export const metadata: Metadata = {
    metadataBase: new URL(defaults.url),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'pl-PL': '/pl-PL',
        },
    },
    title: defaults.title,
    description: defaults.description,
    openGraph: {
        title: defaults.title,
        description: defaults.description,
        url: defaults.url,
        siteName: defaults.title,
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: defaults.title,
        card: 'summary_large_image',
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${font.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster position="bottom-center"/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}