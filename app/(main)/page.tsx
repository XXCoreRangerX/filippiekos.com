import { All } from "@/app/(main)/_components/all";
import { Aside } from "@/app/(main)/_components/aside";
import { Posts } from "@/app/(main)/_components/posts";
import { Footer } from "@/components/footer";
import { GitHubStats } from "./_components/github";

export default function Main() {
    return (
        <>
            <Aside />
            <All />
            <section className="flex basis-1/4 flex-col gap-5">
                <Posts type="articles" />
                <GitHubStats />
                <Footer className="lg:hidden" />
            </section>
        </>
    );
}
