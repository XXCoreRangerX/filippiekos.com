import defaults from "@/constants/defaults";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: defaults.url + "/sitemap.xml",
    };
}
