import { NextResponse } from "next/server"

import { checkLicense } from "@/lib/pro/license"

export const dynamic = "force-dynamic"

/** A few attempts per minute per visitor, so the key checker cannot be used to guess keys. */
const attempts = new Map<string, { count: number; reset: number }>()
const LIMIT = 10

function limited(request: Request) {
  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const now = Date.now()
  const entry = attempts.get(visitor)
  if (!entry || entry.reset < now) {
    attempts.set(visitor, { count: 1, reset: now + 60_000 })
    if (attempts.size > 10_000) attempts.clear()
    return false
  }
  entry.count++
  return entry.count > LIMIT
}

/** Checks a license key for the key checker on /docs/pro. */
export async function POST(request: Request) {
  if (limited(request)) {
    return NextResponse.json({ valid: false, reason: "rate-limited" }, { status: 429 })
  }
  const body = (await request.json().catch(() => null)) as { key?: unknown } | null
  const key = typeof body?.key === "string" ? body.key.slice(0, 200) : null
  const result = await checkLicense(key)
  return NextResponse.json(
    result.valid ? { valid: true, expiresAt: result.expiresAt } : { valid: false, reason: result.reason },
    { headers: { "Cache-Control": "no-store" } }
  )
}
