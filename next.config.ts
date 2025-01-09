import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbo: {
            resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
            },
        ],
    },
};

export default withSentryConfig(nextConfig, {
    org: "zhelta",
    project: "filippiekos-com",
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // Suppresses source map uploading logs during build
    silent: true,
});
