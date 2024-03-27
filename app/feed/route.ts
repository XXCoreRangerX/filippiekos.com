import generateRssFeed from "@/utils/generateFeed";
import { NextResponse } from "next/server";

export async function GET() {
    const websiteFeed = await generateRssFeed();

    return new NextResponse(websiteFeed.rss2(), {
        headers: { "Content-Type": "application/xml" },
        status: websiteFeed ? 200 : 404,
    });
}
