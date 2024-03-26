export type Metadata = {
    title: string;
    description: string;
    date: string;
    updated?: string;
    order: number;
    tags?: string[];
    image?: string;
};

export interface SearchResultItem extends Metadata {
    slug: string;
}

export const ContentTypes = {
    posts: "posts",
    articles: "articles",
};
