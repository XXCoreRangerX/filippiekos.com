import defaults from "@/app.config";
import { CustomMDX } from "@/components/blog/mdx";
import { Achievements } from "@/components/main/achievements";
import { Projects } from "@/components/main/projects";
import { PostList } from "@/components/post-list";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/ui/searchbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function All() {
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
                    <SearchBar className="max-w-56 rounded-tr-[1.2rem] max-[300px]:hidden" />
                </TabsList>
                <section className="mt-3 px-5">
                    <TabsContent value="about" className="grid gap-3">
                        <h3 className="text-3xl font-bold">About me</h3>
                        <article className="prose prose-slate max-w-full text-foreground dark:prose-invert">
                            <CustomMDX source={defaults.about} />
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
