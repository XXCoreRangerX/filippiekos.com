import defaults from "@/app.config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: defaults.url + "/sitemap.xml",
    };
}

export const dynamic = "error";
