import { NextResponse } from "next/server"

import { readBuiltItem } from "@/lib/registry"
import { toV0Dependency } from "@/lib/v0-variant"
import registry from "@/registry.json"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return registry.items
    .filter((item) => item.type !== "registry:theme")
    .map((item) => ({ name: `${item.name}.json` }))
}

/** Serves /r/v0/deps/<name>.json: the item for v0, never with a page (see lib/v0-variant.ts). */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name.replace(/\.json$/, "")
  const item = await readBuiltItem(name)
  if (!item) return NextResponse.json({ error: `Unknown item: ${name}` }, { status: 404 })
  return NextResponse.json(toV0Dependency(item))
}
