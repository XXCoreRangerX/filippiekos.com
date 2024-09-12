import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mx-auto grid h-full gap-5 p-5 max-lg:max-w-2xl lg:flex lg:h-dvh lg:p-10">
            <ThemeToggle variant="fixed" className="max-lg:hidden" />
            {children}
            <Footer className="lg:hidden" />
        </main>
    );
};

export default MainLayout;
