import { Achievements } from "@/app/(main)/_components/achievements";
import { Articles } from "@/app/(main)/_components/articles";
import { Blog } from "@/app/(main)/_components/blog";
import dynamic from "next/dynamic";
import { GitHubStats } from "./_components/github";

const DynamicAbout = dynamic(() =>
    import("@/app/(main)/_components/about").then((mod) => mod.About),
);

export default function Main() {
    return (
        <div className="grid h-full gap-5 p-5 md:flex md:h-screen">
            <div className="md:w-1/3">
                <DynamicAbout />
            </div>
            <div className="flex flex-col gap-5 md:w-7/12">
                <Blog />
                <Achievements />
            </div>
            <div className="flex max-h-screen flex-col gap-5 md:w-3/12">
                <Articles />
                <GitHubStats />
            </div>
        </div>
    );
}
