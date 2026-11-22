import { NextResponse } from "next/server"

import { proConfig } from "@/config/pro"
import { siteConfig } from "@/config/site"
import { checkLicense, licenseKeyFrom, licenseMessage } from "@/lib/pro/license"
import { proRegistry } from "@/registry/__pro_registry__"

export const dynamic = "force-dynamic"

const statusFor = {
  missing: 401,
  invalid: 401,
  expired: 403,
  unconfigured: 503,
  unavailable: 503,
} as const

/**
 * Serves /r/pro/<name>.json, the Pro items, to the shadcn CLI. The license key
 * comes from components.json:
 *
 *   "@balick-pro": {
 *     "url": "https://ui.balick.me/r/pro/{name}.json",
 *     "headers": { "Authorization": "Bearer ${BALICK_PRO_LICENSE}" }
 *   }
 *
 * Refusals carry a `message`, which the CLI prints.
 */
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name.replace(/\.json$/, "")
  const item = proRegistry[name]
  if (!item) {
    return NextResponse.json(
      { error: "Not found", message: `There is no Balick UI Pro item named "${name}".` },
      { status: 404 }
    )
  }

  const license = await checkLicense(licenseKeyFrom(request))
  if (!license.valid) {
    return NextResponse.json(
      {
        error: "Balick UI Pro",
        message: licenseMessage(license, proConfig.envVar, siteConfig.url),
      },
      { status: statusFor[license.reason], headers: { "Cache-Control": "no-store" } }
    )
  }

  return NextResponse.json(item, { headers: { "Cache-Control": "private, no-store" } })
}
