import { NextResponse } from "next/server"

import { shadcnPrimitives, toV0Shadcn } from "@/lib/v0-variant"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return shadcnPrimitives().map((name) => ({ name: `${name}.json` }))
}

/** Serves /r/v0/shadcn/<name>.json: a shadcn/ui primitive with a target, for v0 (see lib/v0-variant.ts). */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name.replace(/\.json$/, "")
  return NextResponse.json(await toV0Shadcn(name))
}
