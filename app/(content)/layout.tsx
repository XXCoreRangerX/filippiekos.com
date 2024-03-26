import React from "react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-full min-h-screen flex-col items-center gap-3 p-3 sm:gap-5 sm:p-5 lg:py-10">
            {children}
        </main>
    );
};

export default ContentLayout;
