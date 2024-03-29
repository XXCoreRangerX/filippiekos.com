import defaults from "@/app.config";
import { getArticles, getPosts, getTags } from "@/utils/blogUtils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    let posts = getPosts().map((post) => ({
        url: defaults.url + "/posts/" + post.slug,
        lastModified: post.date,
    }));

    let articles = getArticles().map((article) => ({
        url: defaults.url + "/articles/" + article.slug,
        lastModified: article.date,
    }));

    let tags = getTags().map((tag) => ({
        url: defaults.url + "/tag/" + tag,
    }));

    let routes = ["", "/posts", "/articles", "/tags"].map((route) => ({
        url: defaults.url + route,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes, ...posts, ...articles, ...tags];
}

export const dynamic = "error";
