import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const MainLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <main>
                <ThemeToggle variant="fixed" className="invisible md:visible"/>
                {children}
            </main>
        </div>
    );
}

export default MainLayout;