import defaults from "@/constants/defaults";
import { ISocialItem } from "@/interfaces";
import { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaReddit, FaXTwitter } from "react-icons/fa6";

const icons: { [index: string]: IconType } = {
    github: FaGithub,
    twitter: FaXTwitter,
    reddit: FaReddit,
    facebook: FaFacebook,
};

const socials: ISocialItem[] = defaults.socials.map((social) => ({
    name: social[0],
    icon: icons[social[0].toLowerCase()],
    url: social[1],
}));

export default socials;
