import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mx-auto grid h-full gap-5 p-5 max-lg:max-w-xl sm:p-8 lg:flex lg:h-screen lg:p-10">
            <ThemeToggle variant="fixed" className="max-lg:hidden" />
            {children}
        </main>
    );
};

export default MainLayout;
