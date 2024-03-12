import { About } from "@/app/(main)/_components/about";
import { All } from "@/app/(main)/_components/all";
import { Posts } from "@/app/(main)/_components/posts";
import { Footer } from "@/components/footer";
import { GitHubStats } from "./_components/github";

export default function Main() {
    return (
        <>
            <section className="basis-1/4">
                <About />
            </section>
            <section className="basis-1/2">
                <All />
            </section>
            <section className="flex basis-1/4 flex-col gap-5">
                <Posts type="articles" />
                <GitHubStats />
                <Footer className="lg:hidden" />
            </section>
        </>
    );
}
