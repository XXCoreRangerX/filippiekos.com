import { Blog } from "@/app/(main)/_components/blog";
import { Articles } from "@/app/(main)/_components/articles";
//import { GitHubStats } from "@/app/(main)/_components/github";
import { Stuff } from "@/app/(main)/_components/stuff";
import dynamic from 'next/dynamic'

const DynamicAbout = dynamic(() =>
    import('@/app/(main)/_components/about').then((mod) => mod.About)
)

export default function Main() {
    return (
        <div className="md:flex grid h-screen gap-5 p-5">
            <div className="md:w-1/3">
                <DynamicAbout/>
            </div>
            <div className="md:w-5/12 flex flex-col gap-5">
                <Blog/>
                <Stuff/>
            </div>
            <div className="md:w-1/4 flex flex-col gap-5 max-h-screen">
                <Articles/>
                <Stuff/>
            </div>
        </div>
    );
}