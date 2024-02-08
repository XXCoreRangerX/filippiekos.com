import defaults from "@/constants/defaults";
import { FaFacebook, FaGithub, FaXTwitter, FaReddit } from "react-icons/fa6";
import { ISocialItem } from "@/interfaces";

const socials: ISocialItem[] = defaults.socials.map((social) => ({
    name: social[0],
    icon: social[1] === "FaGithub" ? FaGithub : social[1] === "FaXTwitter" ? FaXTwitter : social[1] === "FaReddit" ? FaReddit : FaFacebook,
    url: social[2]
}));

export default socials;