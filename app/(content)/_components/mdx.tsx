import Code from "@/app/(content)/_components/code";
import { CustomImage } from "@/components/image";
import Tweet from "@/components/tweet";
import { Callout } from "@/components/ui/callout";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
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

function CustomLink(props: any) {
    let href = props.href;

    if (href.startsWith("/")) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        );
    }

    if (href.startsWith("#")) {
        return <a {...props} />;
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
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

let components = {
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

export function CustomMDX(props: any) {
    return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} options={options} />;
}
