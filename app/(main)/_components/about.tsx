import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { Badge } from "@/components/ui/badge";
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
        <div className="flex h-full flex-col items-center rounded-3xl border-2 bg-card p-5 text-center shadow-md lg:overflow-auto">
            <Image
                src="/pfp.jpg"
                width="250"
                height="250"
                alt=""
                className="my-4 rounded-full shadow-xl ring-4 ring-ring dark:ring-slate-200"
                priority={true}
            />
            <h1 className="text-4xl font-bold">{defaults.fullName}</h1>
            <h2 className="text-lg text-muted-foreground">
                {defaults.subtitle}
            </h2>
            <div className="my-1 flex flex-wrap items-center justify-center gap-2 text-center">
                {socials.map((social, index) => (
                    <Link
                        key={index}
                        href={social.url}
                        aria-label={social.name}
                        className={cn(
                            buttonVariants({ size: "icon", variant: "ghost" }),
                            "h-8 w-8",
                        )}
                    >
                        <social.icon className="h-6 w-6 lg:h-5 lg:w-5" />
                    </Link>
                ))}
            </div>
            <div className="my-2 flex max-w-sm flex-wrap items-center justify-center gap-2 text-center lg:max-w-lg">
                {skills.map((skill, index) => (
                    <Badge key={index} variant="muted">
                        {skill.name}
                    </Badge>
                ))}
            </div>
            <div className="my-2 flex w-full max-w-sm gap-2">
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
            <Separator className="my-3" />
            <div className="flex flex-col gap-1 text-left">
                <h3 className="text-xl font-medium">Bio</h3>
                <CustomMDX source={defaults.bio} />
            </div>
        </div>
    );
}
