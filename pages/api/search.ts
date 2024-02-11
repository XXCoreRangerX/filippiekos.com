import articlesData from "@/data/articles.json";
import postsData from "@/data/posts.json";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        if (req.method === "GET") {
            const data = {
                articles: articlesData,
                posts: postsData,
            };
            res.status(200).json(data);
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
