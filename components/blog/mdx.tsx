import Code from "@/components/blog/code";
import { CustomImage } from "@/components/blog/image";
import Tweet from "@/components/tweet";
import Callout from "@/components/ui/callout";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link, { LinkProps } from "next/link";
import React from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

function slugify(str: string) {
    if (!str) return "";
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")
        .replace(/[^\w\-]+/g, "")
        .replace(/--+/g, "-");
}

function createHeading(level: number) {
    return function Heading({ children }: { children: string }) {
        const slug = slugify(children);
        return (
            <Link href={`#${slug}`} className="no-underline">
                {React.createElement(`h${level}`, { id: slug }, children)}
            </Link>
        );
    };
}

function CustomLink(props: LinkProps & { href: string; children: React.ReactNode }) {
    if (props.href.startsWith("/")) {
        return <Link {...props}>{props.children}</Link>;
    }

    if (props.href.startsWith("#")) {
        return <a {...props} />;
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            // TODO: fix types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            () => (tree: any) => {
                visit(tree, (node) => {
                    if (node?.type === "element" && node?.tagName === "code") {
                        node.properties.raw = node.children[0].value;
                        node.properties.language = (node.properties.className || [])
                            .find((c: string) => c.startsWith("language-"))
                            ?.replace("language-", "");
                    }
                });
            },
            [rehypeHighlight, { detect: true }],
        ],
    },
};

const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    a: CustomLink,
    Image: CustomImage,
    Tweet,
    Callout,
    Separator,
    code: Code,
};

// TODO: fix types when MDXRemoteProps is fixed in next-mdx-remote
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomMDX(props: any) {
    return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} options={options} />;
}
