import { NextResponse } from "next/server"

import { getTemplate, templates } from "@/content/templates"
import { composeRegistryItem } from "@/lib/compose"

export const dynamic = "force-static"

export function generateStaticParams() {
  return templates.map((template) => ({ slug: `${template.slug}.json` }))
}

/**
 * Serves a template as a registry item, e.g. /r/templates/saas.json: the
 * app/page.tsx of the template, with every block it uses as a dependency.
 * Pro blocks are referenced through the @balick-pro namespace, so they
 * install only in a project with a license key.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const template = slug.endsWith(".json") ? getTemplate(slug.slice(0, -".json".length)) : undefined
  if (!template) {
    return NextResponse.json({ error: "Not found", message: `No template called ${slug}.` }, { status: 404 })
  }
  return NextResponse.json(
    composeRegistryItem(template.blocks, {
      name: `template-${template.slug}`,
      title: `${template.title} template`,
      description: template.description,
    })
  )
}
