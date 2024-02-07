import defaults from "@/constants/defaults";
import { ISkillItem } from "@/types";

const skills: ISkillItem[] = defaults.skills.map((skill) => ({
  name: skill
}));

export default skills;