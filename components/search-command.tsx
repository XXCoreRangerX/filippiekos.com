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
import { useSearch } from "@/lib/hooks/use-search";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuFileText, LuHome, LuMonitor, LuMoon, LuSun, LuTag } from "react-icons/lu";

interface SearchResultItem {
    title: string;
    slug: string;
}

export const SearchCommand = () => {
    const router = useRouter();
    const { setTheme } = useTheme();

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };

        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, [toggle]);

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
            const response = await fetch("/api/search");
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
        articles: SearchResultItem[];
        posts: SearchResultItem[];
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
                        <LuHome className="mr-2" />
                        <span>Home</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                {data.articles && data.articles.length > 0 && (
                    <CommandGroup heading="Articles">
                        {data.articles.map((doc) => (
                            <CommandItem key={doc.slug} onSelect={() => onSelect("/articles/" + doc.slug)}>
                                <LuFileText />
                                <span className="flex-1">{doc.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                {data.posts && data.posts.length > 0 && (
                    <CommandGroup heading="Posts">
                        {data.posts.map((doc) => (
                            <CommandItem key={doc.slug} onSelect={() => onSelect("/posts/" + doc.slug)}>
                                <LuFileText />
                                <span className="flex-1">{doc.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                {data.tags && data.tags.length > 0 && (
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
