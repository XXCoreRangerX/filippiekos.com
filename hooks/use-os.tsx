"use client";

import { getArchitecture } from "@/utils/getArchitecture";
import { detectOS, UserOS } from "@/utils/getOS";
import { useEffect, useState } from "react";

type UserOSState = {
    os: UserOS;
    architecture: string;
};

const useDetectOS = () => {
    const [userOSState, setUserOSState] = useState<UserOSState>({
        os: "OTHER",
        architecture: "ARM",
    });

    useEffect(() => {
        Promise.all([getArchitecture()]).then(([architecture]) => {
            setUserOSState({
                os: detectOS(),
                architecture: architecture ? architecture : "",
            });
        });
    }, []);

    return userOSState;
};

export default useDetectOS;
