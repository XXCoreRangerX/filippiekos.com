import fs from "fs";
import path from "path";

type Metadata = {
    title: string;
    description: string;
    date: string;
    order: number;
    tags?: string[];
    image?: string;
};

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

function readMDXFile(filePath: string) {
    let rawContent = fs.readFileSync(filePath, "utf-8");
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
        path.join(process.cwd(), filePath),
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
    return getMDXData(path.join(process.cwd(), "content/posts"));
}

export function getArticles() {
    return getMDXData(path.join(process.cwd(), "content/articles"));
}

export function getTags() {
    let posts = getPosts();
    let tags: string[] = [];
    posts.forEach((post) => {
        if (post.tags) {
            tags.push(...post.tags);
        }
    });
    return Array.from(new Set(tags)).sort();
}

export const contentTypes = {
    posts: "posts",
    articles: "articles",
};
