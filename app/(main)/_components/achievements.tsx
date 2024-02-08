import achievements from "@/data/achievements";
import Link from "next/link";

export function Achievements() {
    return (
        <div className="grid md:flex flex-col bg-secondary border-2 dark:border-slate-700 rounded-3xl p-5 gap-3 shadow-md">
            <h3 className="text-xl font-medium">Achievements</h3>
            <ul className="list-disc list-inside">
                {achievements.map((achievement, index) => (
                    <li key={index}><span className="font-bold">{achievement.place} place</span> at <Link href={achievement.url}>{achievement.title} {achievement.year}</Link></li>
                ))}
            </ul>
        </div>
    );
}