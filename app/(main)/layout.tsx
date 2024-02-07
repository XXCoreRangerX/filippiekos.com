import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const MainLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <main>
                <ThemeToggle variant="fixed"/>
                {children}
            </main>
        </div>
    );
}

export default MainLayout;