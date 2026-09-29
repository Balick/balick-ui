import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { categoryHref, componentDocs, componentHref, componentsByCategory } from "@/content/components"
import { galleryCategories } from "@/lib/blocks-gallery"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const pages = [
    { path: "", priority: 1 },
    { path: "/blocks", priority: 0.9 },
    ...galleryCategories().map((category) => ({ path: `/blocks/${category.slug}`, priority: 0.8 })),
    { path: "/compose", priority: 0.9 },
    { path: "/docs", priority: 0.8 },
    { path: "/docs/installation", priority: 0.8 },
    { path: "/docs/theming", priority: 0.6 },
    { path: "/docs/components", priority: 0.8 },
    ...componentsByCategory().map((category) => ({ path: categoryHref(category.slug), priority: 0.8 })),
    ...componentDocs.map((doc) => ({ path: componentHref(doc.slug), priority: 0.7 })),
    { path: "/templates", priority: 0.4 },
  ]

  return pages.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    priority,
  }))
}
