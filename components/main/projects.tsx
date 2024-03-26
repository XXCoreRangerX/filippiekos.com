import defaults from "@/app.config";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

export interface IProjectItem {
    title: string;
    date: string;
    description: string;
    tags: string[];
    url: string;
}

function ProjectCard({ project, index }: { project: IProjectItem; index: number }) {
    return (
        <Link href={project.url || "/"} key={index} target="_blank" rel="noopener noreferrer">
            <Card variant="outline" hover className="group grid gap-2 sm:grid-cols-4">
                <header className="mt-1.5 text-xs font-medium uppercase text-muted-foreground sm:col-span-1">
                    {project.date}
                </header>
                <div className="grid sm:col-span-3">
                    <h3 className="items-center text-lg font-medium">
                        {project.title}
                        <LuArrowUpRight className="inline-block h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="my-1 text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                            <Badge key={index} variant="muted">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export function Projects() {
    return (
        <div className="grid gap-4">{defaults.projects.map((project, index) => ProjectCard({ project, index }))}</div>
    );
}
