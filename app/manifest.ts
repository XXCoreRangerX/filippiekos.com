import defaults from "@/app.config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: defaults.title,
        short_name: defaults.shortTitle,
        description: defaults.description,
        start_url: "/",
        display: "standalone",
        background_color: defaults.darkColor,
        theme_color: defaults.darkColor,
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-mask.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        shortcuts: [
            {
                name: "All posts",
                short_name: "Posts",
                description: "List of all blog posts",
                url: "/posts",
            },
        ],
    };
}
