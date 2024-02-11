import fs from "fs";
import path from "path";

type Metadata = {
    title: string;
    date: string;
    description?: string;
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
        value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes

        if (key === "tags") {
            tags.push(...value.split(",").map((tag) => tag.trim()));
        } else {
            metadata[key as keyof Metadata] = value as any; // Store the value directly in metadata
        }
    });

    if (tags.length > 0) {
        metadata.tags = tags;
    }

    return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
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
            metadata,
            slug,
            content,
        };
    });
}

function saveDataToJson(data: any, filePath: string, type: string) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(
            data.map(
                ({ metadata, slug }: { metadata: Metadata; slug: string }) => ({
                    title: metadata.title,
                    slug:
                        type === "blog" ? `/blog/${slug}` : `/articles/${slug}`,
                    description: metadata.description,
                    date: metadata.date,
                }),
            ),
            null,
            2,
        ),
        "utf-8",
    );
}

export function getBlogPosts() {
    const data = getMDXData(path.join(process.cwd(), "content/posts"));
    saveDataToJson(data, path.join(process.cwd(), "data/posts.json"), "blog");
    return data;
}

export function getArticles() {
    const data = getMDXData(path.join(process.cwd(), "content/articles"));
    saveDataToJson(
        data,
        path.join(process.cwd(), "data/articles.json"),
        "articles",
    );
    return data;
}
