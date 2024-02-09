import { Blog } from "@/app/(main)/_components/blog";
import { Articles } from "@/app/(main)/_components/articles";
//import { GitHubStats } from "@/app/(main)/_components/github";
import { Achievements } from "@/app/(main)/_components/achievements";
import dynamic from 'next/dynamic'
import { GitHubStats } from "./_components/github";

const DynamicAbout = dynamic(() =>
    import('@/app/(main)/_components/about').then((mod) => mod.About)
)

export default function Main() {
    return (
        <div className="md:flex grid h-full md:h-screen gap-5 p-5">
            <div className="md:w-1/3">
                <DynamicAbout/>
            </div>
            <div className="md:w-7/12 flex flex-col gap-5">
                <Blog/>
                <GitHubStats/>
            </div>
            <div className="md:w-3/12 flex flex-col gap-5 max-h-screen">
                <Articles/>
                <Achievements/>
            </div>
        </div>
    );
}