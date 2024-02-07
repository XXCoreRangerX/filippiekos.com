import { getBlogPosts } from "@/lib/blog";
import defaults from "@/constants/defaults";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: defaults.url + '/blog/' + post.slug,
    lastModified: post.metadata.date
  }));

  let routes = ['', '/blog'].map((route) => ({
    url: defaults.url + route,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}