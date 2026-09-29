import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

import { toV0Item } from "@/lib/v0"

const registryDir = path.join(process.cwd(), "public/r")

export const dynamic = "force-static"
export const dynamicParams = false

/** One variant per built registry item, generated at build time. */
export async function generateStaticParams() {
  const files = await readdir(registryDir)
  return files
    .filter((file) => file.endsWith(".json") && file !== "registry.json")
    .map((name) => ({ name }))
}

/** Serves /r/v0/<name>.json: the item of /r/<name>.json, ready for v0. */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const item = JSON.parse(await readFile(path.join(registryDir, name), "utf8"))
  return NextResponse.json(toV0Item(item))
}
