import articlesData from "@/content/data/articles.json";
import postsData from "@/content/data/posts.json";
import tagsData from "@/content/data/tags.json";

export async function GET() {
    const data = {
        articles: articlesData,
        posts: postsData,
        tags: tagsData,
    };
    return Response.json({ ...data });
}
