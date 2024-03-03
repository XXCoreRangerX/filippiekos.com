import defaults from "@/constants/defaults";
import { IAchievementItem } from "@/interfaces";

const achievements: IAchievementItem[] = defaults.achievements.map((achievement) => ({
    title: achievement[0],
    year: achievement[1],
    place: achievement[2],
    url: achievement[3],
}));

export default achievements;
