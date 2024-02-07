import { IconType } from "react-icons";

export interface ISocialItem {
    name: string;
    icon: IconType;
    url: string;
}

export interface ISkillItem {
    name: string;
}

export interface IAchievementItem {
    title: string;
    year: string;
    place: string;
    url: string;
}