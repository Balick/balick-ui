import { NextResponse } from "next/server"

import { composeRegistryItem, parseComposition } from "@/lib/compose"

type ComposeItem = ReturnType<typeof composeRegistryItem>

/**
 * The HTTP response for a composition segment such as
 * "navbar-01,hero-01.json": the page item, or a 404 naming unknown blocks.
 * `transform` adapts the item and may be asynchronous, e.g. for v0.
 */
export async function composeResponse(
  segment: string,
  transform?: (item: ComposeItem, blocks: string[]) => unknown | Promise<unknown>
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

  const item = composeRegistryItem(blocks)
  return NextResponse.json(transform ? await transform(item, blocks) : item, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  })
}
