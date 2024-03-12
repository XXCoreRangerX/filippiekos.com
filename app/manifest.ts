import defaults from "@/app.config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: defaults.title,
        short_name: defaults.title,
        description: defaults.description,
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#0f172a",
    };
}
