import achievements from "@/data/achievements";
import Link from "next/link";

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
