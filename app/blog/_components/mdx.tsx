import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from "remark-gfm";
import { Note } from "@/components/ui/note";

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
    }
};

let components = {
    Note
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} options={options}/>
  );
}