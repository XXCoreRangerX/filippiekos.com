import defaults from "@/constants/defaults";
import Link from "next/link";

export interface IAchievementItem {
    title: string;
    year: string;
    place: string;
    url: string;
}

const achievements: IAchievementItem[] = defaults.achievements.map((achievement) => ({
    title: achievement[0],
    year: achievement[1],
    place: achievement[2],
    url: achievement[3],
}));

export function Achievements() {
    return (
        <section className="rounded-3xl border-2 bg-card p-5 shadow-md">
            <h3 className="mb-1 text-xl font-medium">Achievements</h3>
            <ul className="list-inside list-disc">
                {achievements.map((achievement, index) => (
                    <li key={index}>
                        <span className="font-bold">{achievement.place} place</span> at{" "}
                        <Link href={achievement.url}>
                            {achievement.title} {achievement.year}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
