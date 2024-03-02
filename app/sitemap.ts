import defaults from "@/constants/defaults";
import { getArticles, getPosts, getTags } from "@/lib/blog";

export default async function sitemap() {
    let posts = getPosts().map((post) => ({
        url: defaults.url + "/blog/" + post.slug,
        lastModified: post.date,
    }));

    let articles = getArticles().map((article) => ({
        url: defaults.url + "/article/" + article.slug,
        lastModified: article.date,
    }));

    let tags = getTags().map((tag) => ({
        url: defaults.url + "/tag/" + tag,
    }));

    let routes = ["", "/blog", "/articles", "/tags"].map((route) => ({
        url: defaults.url + route,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes, ...posts, ...articles, ...tags];
}
