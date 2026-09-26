import { NextResponse } from "next/server"

import { composeRegistryItem, parseComposition } from "@/lib/compose"

/**
 * Serves a registry item for any composition, e.g.
 * /r/compose/navbar-01,hero-01,footer-01.json, so the shadcn CLI installs
 * the page and all its blocks with one command.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blocks: string }> }
) {
  const { blocks: segment } = await params
  const requested = segment.replace(/\.json$/, "").split(",")
  const blocks = parseComposition(segment.replace(/\.json$/, ""))

  if (!segment.endsWith(".json") || !blocks.length || blocks.length !== requested.length) {
    const unknown = requested.filter((name) => !blocks.includes(name))
    return NextResponse.json(
      { error: `Unknown blocks: ${unknown.join(", ") || "none requested"}` },
      { status: 404 }
    )
  }

  return NextResponse.json(composeRegistryItem(blocks), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  })
}
