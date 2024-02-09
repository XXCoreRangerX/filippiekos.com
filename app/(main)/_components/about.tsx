import React from "react";
import defaults from "@/constants/defaults";
import socials from "@/data/socials";
import skills from "@/data/skills";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CustomMDX } from "@/app/(posts)/_components/mdx";
import { buttonVariants } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";

export function About() {
    return (
        <div className="grid md:flex flex-col h-full bg-secondary border-2 dark:border-slate-700 rounded-3xl p-5 gap-3 shadow-md md:overflow-auto md:justify-center">
            <div className="flex flex-col gap-2 text-center justify-center items-center">
                <Image src="/filip.jpg" width="250" height="250" alt="" className="border-4 border-slate-200 rounded-full shadow-2xl" priority={true}/>
                <h1 className="text-4xl font-bold">{defaults.fullName}</h1>
                <h2 className="text-lg text-muted-foreground">
                    {defaults.email.split("").map((char, index) => (
                        <span key={index} className="inline-block">{char}</span>
                    ))}
                </h2>
            </div>
            <div className="flex flex-row flex-wrap gap-3 text-center justify-center items-center">
                {socials.map((social, index) => (
                    <Link key={index} href={social.url}>
                        <social.icon className="w-8 h-8 p-1.5 bg-slate-200 text-black rounded-md hover:bg-slate-300"/>
                    </Link>
                ))}
            </div>
            <div className="flex flex-row flex-wrap gap-2 text-center justify-center items-center">
                {skills.map((skill, index) => (
                    <span key={index} className="p-1 dark:bg-slate-700 bg-slate-200 border-slate-300 rounded-md text-xs dark:text-slate-300 text-slate-600 font-medium">{skill.name}</span>
                ))}
            </div>
            <div className="flex flex-row gap-2 mt-1 mb-1">
                <Link href={"mailto:" + defaults.email} download className={cn('gap-2 w-full', buttonVariants({ variant: "default" }))}><Mail className="w-5 h-5"/>Contact</Link>
                <Link href="/filip.jpg" download className={cn('gap-2', buttonVariants({ variant: "secondary" }))}><Download className="w-5 h-5"/>CV</Link>
            </div>
            <hr className="dark:border-slate-600 rounded-full"/>
            <div className="flex flex-col gap-1 text-left">
                <h3 className="text-xl font-medium">Bio</h3>
                <CustomMDX source={defaults.bio}/>
            </div>
        </div>
    );
}