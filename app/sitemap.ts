import defaults from "@/app.config";
import { getArticles, getPosts, getTags } from "@/utils/blogUtils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPosts().map((post) => ({
        url: defaults.url + "/posts/" + post.slug,
        lastModified: post.date,
    }));

    const articles = getArticles().map((article) => ({
        url: defaults.url + "/articles/" + article.slug,
        lastModified: article.date,
    }));

    const tags = getTags().map((tag) => ({
        url: defaults.url + "/tag/" + tag,
    }));

    const routes = ["", "/posts", "/articles", "/tags"].map((route) => ({
        url: defaults.url + route,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes, ...posts, ...articles, ...tags];
}

export const dynamic = "error";
