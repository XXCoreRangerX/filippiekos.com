import { CustomMDX } from "@/app/(content)/_components/mdx";
import { Achievements } from "@/app/(main)/_components/achievements";
import { Projects } from "@/app/(main)/_components/projects";
import { PostList } from "@/components/post-list";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { readMDXFile } from "@/lib/blog";

export function All() {
    return (
        <Card type="article" className="basis-1/2 overflow-y-auto rounded-3xl border-2 p-0 pb-5 shadow-md">
            <Tabs defaultValue="about">
                <TabsList className="sticky top-0 z-50 w-full border-b-2 bg-card min-[400px]:justify-start">
                    <TabsTrigger className="min-[400px]:rounded-tl-[1.2rem]" value="about">
                        About
                    </TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>
                <section className="mt-3 px-5">
                    <TabsContent value="about" className="grid gap-3">
                        <h3 className="text-3xl font-bold">About me</h3>
                        <article className="prose prose-slate max-w-full text-foreground dark:prose-invert">
                            <CustomMDX source={readMDXFile("content/about.mdx").content} />
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
