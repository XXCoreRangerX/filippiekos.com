"use client";

import { useEffect, useState } from "react";

function useMediaQuery(query: string, initialMatches: boolean): boolean {
    const [matches, setMatches] = useState<boolean>(initialMatches);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mq = window.matchMedia(query);

            const handler = (e: MediaQueryListEvent): void => setMatches(e.matches);

            mq.addListener(handler);
            setMatches(mq.matches);

            return () => {
                mq.removeListener(handler);
            };
        }
    }, [query]);

    return matches;
}

export default useMediaQuery;
