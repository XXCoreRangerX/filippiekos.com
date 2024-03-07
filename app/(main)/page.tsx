import { About } from "@/app/(main)/_components/about";
import { Achievements } from "@/app/(main)/_components/achievements";
import { Posts } from "@/app/(main)/_components/posts";
import { Footer } from "@/components/footer";
import { GitHubStats } from "./_components/github";

export default function Main() {
    return (
        <>
            <section className="basis-1/4">
                <About />
            </section>
            <section className="flex basis-1/2 flex-col gap-5">
                <Posts type="posts" />
                <Achievements />
            </section>
            <section className="flex basis-1/4 flex-col gap-5">
                <Posts type="articles" />
                <GitHubStats />
                <Footer className="lg:hidden" />
            </section>
        </>
    );
}
