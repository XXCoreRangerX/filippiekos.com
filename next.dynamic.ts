import defaults from "@/app.config";

/* @return {import('next').Viewport} */
export const PAGE_VIEWPORT = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: defaults.lightColor },
        { media: "(prefers-color-scheme: dark)", color: defaults.darkColor },
    ],
};

/* @type {import('next').Metadata} */
export const PAGE_METADATA = {
    metadataBase: new URL(defaults.url),
    alternates: {
        canonical: "/",
        types: {
            "application/rss+xml": "feed",
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
        images: "/og-image.png",
    },
    twitter: {
        title: defaults.title,
        description: defaults.description,
        creator: "@" + defaults.username,
        card: "summary_large_image",
        images: defaults.url + "/twitter-image.png",
    },
    icons: {
        icon: [
            { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
            { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
};
