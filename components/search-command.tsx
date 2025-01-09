"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useKeyboardShortcut } from "@/hooks/use-keyboard";
import { useSearch } from "@/hooks/use-search";
import { ContentItem } from "@/types/blog";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuFileText, LuHouse, LuMonitor, LuMoon, LuSun, LuTag } from "react-icons/lu";

export const SearchCommand = () => {
    const router = useRouter();
    const { setTheme } = useTheme();

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useKeyboardShortcut("k", toggle);

    const onSelect = (slug: string) => {
        router.push(slug);
        onClose();
    };

    const onThemeChange = (theme: string) => {
        setTheme(theme);
        onClose();
    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/blog");
            if (response.ok) {
                return await response.json();
            } else {
                return { articles: [], posts: [], tags: [] };
            }
        } catch (error) {
            console.error(error);
            return { articles: [], posts: [], tags: [] };
        }
    };

    const [data, setData] = useState<{
        articles: ContentItem[];
        posts: ContentItem[];
        tags: string[];
    }>({
        articles: [],
        posts: [],
        tags: [],
    });

    useEffect(() => {
        fetchData().then(setData);
    }, []);

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    <CommandItem onSelect={() => onSelect("/")}>
                        <LuHouse />
                        <span className="flex-1">Home</span>
                    </CommandItem>
                </CommandGroup>
                {data?.articles?.length > 0 && (
                    <CommandGroup heading="Articles">
                        {data.articles.map((article) => (
                            <CommandItem key={article.slug} onSelect={() => onSelect("/articles/" + article.slug)}>
                                <LuFileText />
                                <span className="flex-1">{article.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                {data?.posts?.length > 0 && (
                    <CommandGroup heading="Posts">
                        {data.posts.map((post) => (
                            <CommandItem key={post.slug} onSelect={() => onSelect("/posts/" + post.slug)}>
                                <LuFileText />
                                <span className="flex-1">{post.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                {data?.tags?.length > 0 && (
                    <CommandGroup heading="Tags">
                        {data.tags.map((tag) => (
                            <CommandItem key={tag} onSelect={() => onSelect("/tags/" + tag)}>
                                <LuTag />
                                <span className="flex-1">{tag}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                <CommandSeparator />
                <CommandGroup heading="Theme">
                    <CommandItem onSelect={() => onThemeChange("light")}>
                        <LuSun />
                        <span className="flex-1">Light</span>
                    </CommandItem>
                    <CommandItem onSelect={() => onThemeChange("dark")}>
                        <LuMoon />
                        <span className="flex-1">Dark</span>
                    </CommandItem>
                    <CommandItem onSelect={() => onThemeChange("system")}>
                        <LuMonitor />
                        <span className="flex-1">System</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
