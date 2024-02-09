import defaults from "@/constants/defaults";
import { ISocialItem } from "@/interfaces";
import { FaFacebook, FaGithub, FaReddit, FaXTwitter } from "react-icons/fa6";

const socials: ISocialItem[] = defaults.socials.map((social) => ({
    name: social[0],
    icon:
        social[1] === "FaGithub"
            ? FaGithub
            : social[1] === "FaXTwitter"
              ? FaXTwitter
              : social[1] === "FaReddit"
                ? FaReddit
                : FaFacebook,
    url: social[2],
}));

export default socials;
