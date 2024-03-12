import defaults from "@/app.config";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LuGraduationCap } from "react-icons/lu";

export interface IAchievementItem {
    type: string;
    title: string;
    date: string;
    location?: string;
    place?: string;
    url: string;
}

function AchievementCard({ achievement, index }: { achievement: IAchievementItem; index: number }) {
    return (
        <Link
            href={achievement.url || "/"}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-grid"
        >
            <Card
                variant="outline"
                hover
                key={index}
                className="flex min-h-32 cursor-pointer items-center max-lg:min-h-44 max-lg:flex-col max-lg:justify-center max-lg:text-center lg:gap-5"
            >
                <header className="basis-1/5 text-center lg:grid">
                    {achievement.type === "Scholarship" && <LuGraduationCap className="mx-auto h-12 w-12" />}
                    {achievement.place != "" && <h1 className="text-5xl font-extrabold">{achievement.place}</h1>}
                    <p className="text-xs">{achievement.type}</p>
                </header>
                <div className="grid gap-1">
                    <h2 className="line-clamp-2 text-lg font-bold">{achievement.title}</h2>
                    <h3 className="text-sm font-medium uppercase text-muted-foreground">
                        {achievement.date} {achievement.location && "— " + achievement.location}
                    </h3>
                </div>
            </Card>
        </Link>
    );
}

export function Achievements() {
    return (
        <div className="grid gap-4 min-[500px]:max-lg:grid-cols-2 xl:grid-cols-2">
            {defaults.achievements.map((achievement, index) => AchievementCard({ achievement, index }))}
        </div>
    );
}
