import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from "remark-gfm";
import { Note } from "@/components/ui/note";
import { TweetComponent } from "@/app/(posts)/_components/tweet";
import Link from "next/link";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function createHeading(level: number) {
  return function Heading({ children }: { children: string }) {
    const slug = slugify(children);
    return React.createElement('h' + level, { id: slug }, [
        <Link key="link" href={'#' + slug} className="anchor">
            #
        </Link>,
        children,
        ]
    );
  };
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
    }
};

let components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    a: CustomLink,
    Tweet: TweetComponent,
    Note
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} options={options}/>
  );
}