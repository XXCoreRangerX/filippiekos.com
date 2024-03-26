/// <reference types="user-agent-data-types" />

export const getArchitecture = async () => {
    if (typeof navigator?.userAgentData?.getHighEntropyValues === "function") {
        const entropyValues = navigator.userAgentData.getHighEntropyValues(["architecture"]);

        return Promise.resolve(entropyValues)
            .then(({ architecture }) => architecture)
            .catch(() => undefined);
    }

    return undefined;
};
