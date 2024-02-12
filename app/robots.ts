import defaults from "@/constants/defaults";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
            },
        ],
        sitemap: defaults.url + "/sitemap.xml",
    };
}
