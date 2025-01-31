import defaults from "@/app.config";
import { CustomMDX } from "@/components/blog/mdx";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import profilePic from "@/public/assets/pfp.webp";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaBluesky, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaRedditAlien, FaXTwitter } from "react-icons/fa6";
import { LuDownload, LuMail } from "react-icons/lu";

export interface ISocialItem {
    name: string;
    icon: IconType;
    url: string;
}

const icons: { [index: string]: IconType } = {
    github: FaGithub,
    bluesky: FaBluesky,
    reddit: FaRedditAlien,
    twitter: FaXTwitter,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    facebook: FaFacebook,
};

const socials: ISocialItem[] = defaults.socials.map((social) => ({
    name: social[0],
    icon: icons[social[0].toLowerCase()],
    url: social[1],
}));

export function Aside() {
    const bio = `
    Aspiring DevOps engineer and developer. I'm a **tech enthusiast** interested in programming, computer science, design and tinkering with electronics.

    Studying at ZSTiO in Jarosław, Poland.
    `;

    return (
        <Card
            type="aside"
            variant="outline"
            className="grid h-full basis-1/4 rounded-3xl border-2 shadow-md lg:overflow-y-auto"
        >
            <div className="my-auto flex flex-col items-center text-center">
                <Image
                    src={profilePic}
                    width="250"
                    height="250"
                    quality="85"
                    alt=""
                    className="mb-4 rounded-full shadow-xl ring-4 ring-ring dark:ring-slate-200"
                    priority
                />
                <h1 className="text-4xl font-bold">{defaults.fullName}</h1>
                <h2 className="text-lg text-muted-foreground">{defaults.subtitle}</h2>
                <div className="my-1 flex flex-wrap justify-center gap-1.5">
                    {socials.map((social, index) => (
                        <Link
                            key={index}
                            href={social.url}
                            aria-label={social.name}
                            className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "h-8 w-8")}
                        >
                            <social.icon className="h-6 w-6 lg:h-5 lg:w-5" />
                        </Link>
                    ))}
                </div>
                <div className="my-2 flex max-w-lg flex-wrap justify-center gap-2 lg:max-xl:hidden">
                    {defaults.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                            {skill}
                        </Badge>
                    ))}
                </div>
                <div className="my-2 flex w-full max-w-md justify-center gap-2">
                    <Link
                        href={"mailto:" + defaults.email}
                        download
                        className={cn("w-full gap-2", buttonVariants({ variant: "default" }))}
                        aria-label="Contact"
                    >
                        <LuMail className="h-5 w-5" />
                        <span>Contact</span>
                    </Link>
                    <Link
                        href="/"
                        download
                        className={cn("gap-2", buttonVariants({ variant: "outline" }))}
                        aria-label="CV"
                    >
                        <LuDownload className="h-5 w-5" />
                        <span className="max-xl:hidden">CV</span>
                    </Link>
                </div>
                <Separator className="my-3" />
                <div className="flex w-full flex-col gap-1 text-left">
                    <h3 className="text-xl font-medium">Bio</h3>
                    <CustomMDX source={bio} />
                </div>
            </div>
        </Card>
    );
}
