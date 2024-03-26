import { All } from "@/components/main/all";
import { Aside } from "@/components/main/aside";
import { GitHubStats } from "@/components/main/github";
import { Posts } from "@/components/main/posts";

export default function Main() {
    return (
        <>
            <Aside />
            <All />
            <section className="flex basis-1/4 flex-col gap-5">
                <Posts type="articles" />
                <GitHubStats />
            </section>
        </>
    );
}
