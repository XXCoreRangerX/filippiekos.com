import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { buttonVariants } from "@/components/ui/button";
import defaults from "@/constants/defaults";
import skills from "@/data/skills";
import socials from "@/data/socials";
import { cn } from "@/lib/utils";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function About() {
    return (
        <div className="grid h-full flex-col gap-3 rounded-3xl border-2 bg-secondary p-5 shadow-md dark:border-slate-700 md:flex md:justify-center md:overflow-auto">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Image
                    src="/pfp.jpg"
                    width="250"
                    height="250"
                    alt=""
                    className="rounded-full border-4 border-slate-200 shadow-2xl"
                    priority={true}
                />
                <h1 className="text-4xl font-bold">{defaults.fullName}</h1>
                <h2 className="text-lg text-muted-foreground">
                    {defaults.email.split("").map((char, index) => (
                        <span key={index} className="inline-block">
                            {char}
                        </span>
                    ))}
                </h2>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 text-center">
                {socials.map((social, index) => (
                    <Link key={index} href={social.url}>
                        <social.icon className="h-8 w-8 rounded-md bg-slate-200 p-1.5 text-black hover:bg-slate-300" />
                    </Link>
                ))}
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-center">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="rounded-md border-slate-300 bg-slate-200 p-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
            <div className="mb-1 mt-1 flex flex-row gap-2">
                <Link
                    href={"mailto:" + defaults.email}
                    download
                    className={cn(
                        "w-full gap-2",
                        buttonVariants({ variant: "default" }),
                    )}
                >
                    <Mail className="h-5 w-5" />
                    Contact
                </Link>
                <Link
                    href="cv.pdf"
                    download
                    className={cn(
                        "gap-2",
                        buttonVariants({ variant: "secondary" }),
                    )}
                >
                    <Download className="h-5 w-5" />
                    CV
                </Link>
            </div>
            <hr className="rounded-full dark:border-slate-600" />
            <div className="flex flex-col gap-1 text-left">
                <h3 className="text-xl font-medium">Bio</h3>
                <CustomMDX source={defaults.bio} />
            </div>
        </div>
    );
}
