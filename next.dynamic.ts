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
        languages: {
            "en-US": "/en-US",
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
