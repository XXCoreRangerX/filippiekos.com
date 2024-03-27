import { CustomMDX } from "@/components/blog/mdx";
import { Achievements } from "@/components/main/achievements";
import { Projects } from "@/components/main/projects";
import { PostList } from "@/components/post-list";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/ui/searchbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function All() {
    const about = `
    I've been interested in computers and technology for as long as I remember. I mostly work with **web technologies**, but I also enjoy **embedded systems** and **low-level programming**.
    Recently also taken interest in **machine learning** and **artificial intelligence**.
    
    My hobbies include **homelabbing**, **3D printing**, **electronics** and **tinkering** with various gadgets and devices. I also enjoy some casual gaming and listen to heavy metal or EDM music.
    
    I'm fully **self-taught**, and I've been working on various projects for the past few years, most notably **[ZHELTA](https://zhelta.pl)** — an ecosystem of custom, contactless, programmable keyboards for people with disabilities.
    
    The project has been featured in various local, national and international media outlets, and has been presented at multiple conferences and events. ZHELTA has received the international [Regeneron ISEF 2023](https://www.societyforscience.org/press-release/regeneron-isef-full-awards-2023/) science and engineering competition **3rd Grand Award** in Engineering - Embedded Systems along with the **2nd place Special Award** by [IEEE](https://spectrum.ieee.org/ieee-presidents-scholarship-2023) and **1st place Grand Award** at the national [Explory 2022](https://www.explory.pl/laureat/filip-piekos,188) competition.
    
    I've been giving out ZHELTA keyboards to people with disabilities **for free**, thanks to the support of various sponsors and donors, and I'm working on making them more accessible and affordable.
    
    I'm a [Rafał Brzoska Foundation](https://rafalbrzoskafoundation.org/stypendysci-fundacja-rafala-brzoski/) scholarship holder, a scholarship for young people with outstanding achievements.
    
    Currently, I'm a **high school student** at [ZSTiO, Jarosław, Poland](https://zstiojar.edu.pl/), but I'm looking forward to studying computer science at a university in the near future.
    `;

    return (
        <Card type="article" className="basis-1/2 overflow-y-auto rounded-3xl border-2 p-0 pb-5 shadow-md">
            <Tabs defaultValue="about">
                <TabsList className="sticky top-0 z-50 w-full justify-between gap-2 border-b-2 bg-card shadow-md">
                    <div className="flex flex-nowrap gap-1 text-nowrap">
                        <TabsTrigger className="rounded-tl-[1.2rem]" value="about">
                            About
                        </TabsTrigger>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                    </div>
                    <SearchBar className="w-full max-w-56 rounded-tr-[1.2rem] max-[380px]:hidden" />
                </TabsList>
                <section className="mt-3 px-5">
                    <TabsContent value="about" className="grid gap-3">
                        <h3 className="text-3xl font-bold">About me</h3>
                        <article className="prose prose-slate max-w-full text-foreground dark:prose-invert">
                            <CustomMDX source={about} />
                        </article>
                        <Separator />
                        <h3 className="text-3xl font-bold">Achievements</h3>
                        <Achievements />
                        <h3 className="mt-2 text-3xl font-bold">Projects</h3>
                        <Projects />
                    </TabsContent>
                    <TabsContent value="posts">
                        <PostList type="posts" />
                    </TabsContent>
                </section>
            </Tabs>
        </Card>
    );
}
