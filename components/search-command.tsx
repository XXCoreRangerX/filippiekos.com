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
import articles from "@/data/articles.json";
import posts from "@/data/posts.json";
import { useSearch } from "@/hooks/use-search";
import { FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    // change theme like with the theme toggle (const { setTheme } = useTheme();) but with onClose() added too
    const onThemeChange = (theme: string) => {
        setTheme(theme);
        onClose();
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search posts...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Articles">
                    {articles.map((doc) => (
                        <CommandItem
                            key={doc.slug}
                            onSelect={() => onSelect(doc.slug)}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{doc.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Posts">
                    {posts.map((doc) => (
                        <CommandItem
                            key={doc.slug}
                            onSelect={() => onSelect(doc.slug)}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{doc.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Theme">
                    <CommandItem onSelect={() => onThemeChange("light")}>
                        Light
                    </CommandItem>
                    <CommandItem onSelect={() => onThemeChange("dark")}>
                        Dark
                    </CommandItem>
                    <CommandItem onSelect={() => onThemeChange("system")}>
                        System
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
