import defaults from "@/constants/defaults";
import Image from "next/image";

export function GitHubStats() {
    return (
        <div className="bg-secondary border-2 dark:border-slate-700 rounded-3xl pt-2 pb-2 w-full shadow-md">
            <Image src={defaults.githubStats} width="10" height="10" className="w-96" alt="GitHub Stats"/>
        </div>
    );
}