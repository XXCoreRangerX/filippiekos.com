import articlesData from "@/data/articles.json";
import postsData from "@/data/posts.json";
import tagsData from "@/data/tags.json";

export async function GET() {
    const data = {
        articles: articlesData,
        posts: postsData,
        tags: tagsData,
    };
    return Response.json({ ...data });
}
