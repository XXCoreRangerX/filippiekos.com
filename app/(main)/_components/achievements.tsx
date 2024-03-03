import achievements from "@/data/achievements";
import Link from "next/link";

export function Achievements() {
    return (
        <div className="grid flex-col gap-1 rounded-3xl border-2 bg-card p-5 shadow-md lg:flex">
            <h3 className="text-xl font-medium">Achievements</h3>
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
        </div>
    );
}
