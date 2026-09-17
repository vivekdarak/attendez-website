import type { Metadata } from "next";

const SITE_URL = "https://attendez.in";
const DIRECTUS_REVALIDATE_SECONDS = 60 * 60 * 3;

type DirectusListResponse<T> = { data: T[] };

export type SeoPage = {
  route_path: string;
  meta_title: string;
  meta_description: string;
  canonical_url?: string | null;
  robots_index?: boolean | null;
  robots_follow?: boolean | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  published_at?: string | null;
  excerpt?: string | null;
  content_html?: string | null;
  featured_image?: string | null;
  author?: { name: string; slug: string; bio?: string | null; image?: string | null } | null;
  category?: { title: string; slug: string } | null;
  tags?: Array<{ tag?: { title: string; slug: string } | null }>;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  faq_items?: Array<{ question: string; answer: string }> | null;
  schema_type?: "BlogPosting" | "Article" | null;
};

function config() {
  const url = process.env.DIRECTUS_URL?.replace(/\/$/, "");
  const token = process.env.DIRECTUS_TOKEN;

  if (!url) return null;
  return { url, token };
}

async function directusList<T>(collection: string, params: URLSearchParams): Promise<T[]> {
  const directus = config();
  if (!directus) return [];

  const response = await fetch(`${directus.url}/items/${collection}?${params}`, {
    headers: directus.token ? { Authorization: `Bearer ${directus.token}` } : undefined,
    next: {
      revalidate: DIRECTUS_REVALIDATE_SECONDS,
      tags: [collection === "attendez_seo_pages" ? "attendez-seo" : "attendez-blog"],
    },
  });

  if (!response.ok) {
    console.error(`Directus ${collection} request failed with ${response.status}`);
    return [];
  }

  const payload = (await response.json()) as DirectusListResponse<T>;
  return payload.data ?? [];
}

export function directusAssetUrl(id?: string | null) {
  const directus = config();
  return directus && id ? `${directus.url}/assets/${id}` : null;
}

export async function getSeoPage(routePath: string) {
  const params = new URLSearchParams({
    "filter[status][_eq]": "published",
    "filter[route_path][_eq]": routePath,
    limit: "1",
  });
  const [page] = await directusList<SeoPage>("attendez_seo_pages", params);
  return page ?? null;
}

export function seoPageToMetadata(page: SeoPage | null, fallback: Metadata): Metadata {
  if (!page) return fallback;

  const canonical = page.canonical_url || new URL(page.route_path, SITE_URL).toString();
  const image = directusAssetUrl(page.og_image);

  return {
    ...fallback,
    title: page.meta_title,
    description: page.meta_description,
    alternates: { canonical },
    robots: {
      index: page.robots_index !== false,
      follow: page.robots_follow !== false,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: page.og_title || page.meta_title,
      description: page.og_description || page.meta_description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

const blogFields = [
  "id", "title", "slug", "published_at", "excerpt", "content_html", "featured_image",
  "author.name", "author.slug", "author.bio", "author.image",
  "category.title", "category.slug", "tags.tag.title", "tags.tag.slug",
  "meta_title", "meta_description", "canonical_url", "faq_items", "schema_type",
].join(",");

export function getBlogPosts() {
  const params = new URLSearchParams({
    "filter[status][_eq]": "published",
    fields: blogFields,
    sort: "-published_at",
  });
  return directusList<BlogPost>("attendez_blog_posts", params);
}

export async function getBlogPost(slug: string) {
  const params = new URLSearchParams({
    "filter[status][_eq]": "published",
    "filter[slug][_eq]": slug,
    fields: blogFields,
    limit: "1",
  });
  const [post] = await directusList<BlogPost>("attendez_blog_posts", params);
  return post ?? null;
}
