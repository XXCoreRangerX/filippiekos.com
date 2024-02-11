"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";

export default function SearchBar() {
    const toggle = useSearch((store) => store.toggle);
    return (
        <div className="flex items-center space-x-2">
            <Input type="text" className="px-3 py-2" placeholder="Search..." />
            <Button onClick={toggle}>Search</Button>
        </div>
    );
}
