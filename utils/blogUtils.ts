import { Metadata } from "@/types/blog";
import fs from "fs";
import path from "path";

function parseFrontmatter(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);
    const frontMatterBlock = match![1];
    const content = fileContent.replace(frontmatterRegex, "").trim();
    const frontMatterLines = frontMatterBlock.trim().split("\n");
    const metadata: Partial<Metadata> = {};
    const tags: string[] = [];

    frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(": ");
        let value = valueArr.join(": ").trim();
        value = value.replace(/^['"](.*)['"]$/, "$1");

        if (key === "tags") {
            tags.push(...value.split(",").map((tag) => tag.trim()));
        } else {
            metadata[key as keyof Metadata] = value as any;
        }
    });

    if (tags.length > 0) {
        metadata.tags = tags;
    }

    return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx" || path.extname(file) === ".md");
}

export function readMDXFile(filePath: string) {
    let rawContent = fs.readFileSync(path.resolve(filePath), "utf-8");
    return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
    let mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file) => {
        let { metadata, content } = readMDXFile(path.join(dir, file));
        let slug = path.basename(file, path.extname(file));
        return {
            ...metadata,
            slug,
            content,
        };
    });
}

export function saveDataToJson(data: any, filePath: string) {
    fs.writeFileSync(
        path.join(path.resolve(filePath)),
        JSON.stringify(
            data.sort((a: any, b: any) => {
                if (a.order && b.order) {
                    return a.order - b.order;
                }
                if (a.date && b.date) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }
            }),
            (key, value) => (key === "content" ? undefined : value),
            4,
        ),
        "utf-8",
    );
}

/* TODO: Implement a table of contents
    export function getTableOfContents(content: string) {
        const regex = /^#{1,4}\s+(.*)/gm;
        return content.match(regex)?.map((heading) => (
            heading
                .replace(/#+\s+/, "")
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/(^-|-$)/g, "")
        )) || []
    }
    */

export function getPosts() {
    return getMDXData(path.join(path.resolve("content/posts")));
}

export function getSortedPosts() {
    return getPosts().sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());
}

export function getArticles() {
    return getMDXData(path.join(path.resolve("content/articles")));
}

export function getSortedArticles() {
    return getArticles().sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getTags() {
    const tags: Set<string> = new Set();

    getPosts().forEach((post) => {
        if (post.tags) {
            post.tags.forEach((tag) => tags.add(tag));
        }
    });
    return Array.from(tags);
}
