import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import defaults from "@/constants/defaults";
import skills from "@/data/skills";
import socials from "@/data/socials";
import { cn } from "@/lib/utils";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function About() {
    return (
        <div className="grid h-full flex-col gap-3 rounded-3xl border-2 bg-card p-5 shadow-md md:flex md:overflow-auto">
            <div className="flex flex-col items-center gap-2 text-center">
                <Image
                    src="/pfp.jpg"
                    width="250"
                    height="250"
                    alt=""
                    className="rounded-full shadow-2xl ring-4 ring-ring dark:ring-slate-200"
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
            <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                {socials.map((social, index) => (
                    <Link
                        key={index}
                        href={social.url}
                        className={buttonVariants({ size: "icon" })}
                    >
                        <social.icon className="h-6 w-6" />
                    </Link>
                ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="rounded-md bg-muted p-1 text-xs font-medium text-muted-foreground"
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
            <div className="mb-1 mt-1 flex gap-2">
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
            <Separator />
            <div className="flex flex-col gap-1 text-left">
                <h3 className="text-xl font-medium">Bio</h3>
                <CustomMDX source={defaults.bio} />
            </div>
        </div>
    );
}
