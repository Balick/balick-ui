import { NextResponse } from "next/server"

import { siteConfig } from "@/config/site"
import { templateRegistryUrl, templates } from "@/content/templates"

export const dynamic = "force-static"

/** The list of templates, for tools and scripts (see scripts/template-screenshots.mjs). */
export function GET() {
  return NextResponse.json({
    homepage: `${siteConfig.url}/templates`,
    templates: templates.map(({ slug, title, description, tier, blocks }) => ({
      slug,
      title,
      description,
      tier,
      blocks,
      url: templateRegistryUrl(slug),
    })),
  })
}
