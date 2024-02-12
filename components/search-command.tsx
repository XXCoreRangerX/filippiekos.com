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
import { useSearch } from "@/hooks/use-search";
import { FileText, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchResultItem {
    title: string;
    slug: string;
}

export const SearchCommand = () => {
    const router = useRouter();

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

    const { setTheme } = useTheme();
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
                return { articles: [], posts: [] };
            }
        } catch (error) {
            console.error(error);
            return { articles: [], posts: [] };
        }
    };

    const [data, setData] = useState<{
        articles: SearchResultItem[];
        posts: SearchResultItem[];
    }>({
        articles: [],
        posts: [],
    });

    useEffect(() => {
        fetchData().then(setData);
    }, []);

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {data.articles.length > 0 && (
                    <CommandGroup heading="Articles">
                        {data.articles.map((doc) => (
                            <CommandItem
                                key={doc.slug}
                                onSelect={() => onSelect(doc.slug)}
                            >
                                <FileText className="mr-2" />
                                <span>{doc.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                {data.posts.length > 0 && (
                    <CommandGroup heading="Posts">
                        {data.posts.map((doc) => (
                            <CommandItem
                                key={doc.slug}
                                onSelect={() => onSelect(doc.slug)}
                            >
                                <FileText className="mr-2" />
                                <span>{doc.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                <CommandSeparator />
                <CommandGroup heading="Theme">
                    <CommandItem onSelect={() => onThemeChange("light")}>
                        <Sun className="mr-2" />
                        Light
                    </CommandItem>
                    <CommandItem onSelect={() => onThemeChange("dark")}>
                        <Moon className="mr-2" />
                        Dark
                    </CommandItem>
                    <CommandItem onSelect={() => onThemeChange("system")}>
                        <Laptop className="mr-2" />
                        System
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
