import defaults from "@/app.config";
import { getSortedPosts } from "@/utils/blogUtils";
import { Feed } from "feed";

export default async function generateRssFeed() {
    const posts = getSortedPosts();

    const feed = new Feed({
        title: defaults.title,
        description: defaults.description,
        language: "en",
        id: defaults.url,
        link: defaults.url,
        image: `${defaults.url}/og-image.png`,
        favicon: `${defaults.url}/favicon.ico`,
        copyright: `© ${new Date().getFullYear()} ${defaults.title}`,
    });

    posts.forEach((post) => {
        feed.addItem({
            title: post.title,
            description: post.description,
            author: [
                {
                    name: defaults.fullName,
                    email: defaults.email,
                    link: defaults.url,
                },
            ],
            id: `${defaults.url}/${post.slug}`,
            link: `${defaults.url}/${post.slug}`,
            date: new Date(post.updated ?? post.date),
        });
    });

    return feed;
}
