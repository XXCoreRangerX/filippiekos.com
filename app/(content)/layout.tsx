import React from "react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-full min-h-screen flex-col items-center gap-5 p-5 sm:px-24 sm:py-8 lg:py-10">
            {children}
        </main>
    );
};

export default ContentLayout;
