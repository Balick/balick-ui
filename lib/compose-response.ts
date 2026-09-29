import { NextResponse } from "next/server"

import { composeRegistryItem, parseComposition } from "@/lib/compose"

/**
 * The HTTP response for a composition segment such as
 * "navbar-01,hero-01.json": the page item, or a 404 naming unknown blocks.
 * `transform` adapts the item, e.g. for v0.
 */
export function composeResponse(
  segment: string,
  transform: <T extends ReturnType<typeof composeRegistryItem>>(item: T) => T = (item) => item
) {
  const requested = segment.replace(/\.json$/, "").split(",")
  const blocks = parseComposition(segment.replace(/\.json$/, ""))

  if (!segment.endsWith(".json") || !blocks.length || blocks.length !== requested.length) {
    const unknown = requested.filter((name) => !blocks.includes(name))
    return NextResponse.json(
      { error: `Unknown blocks: ${unknown.join(", ") || "none requested"}` },
      { status: 404 }
    )
  }

  return NextResponse.json(transform(composeRegistryItem(blocks)), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  })
}
