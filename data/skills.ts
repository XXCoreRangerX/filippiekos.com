import defaults from "@/constants/defaults";
import { ISkillItem } from "@/interfaces";

const skills: ISkillItem[] = defaults.skills.map((skill) => ({
  name: skill
}));

export default skills;