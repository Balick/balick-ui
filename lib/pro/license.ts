import { createHash } from "node:crypto"

/**
 * License keys of Balick UI Pro. Keys are issued by Polar (License Keys
 * benefit) when someone buys a plan, and checked against Polar's API.
 *
 * Environment:
 * - POLAR_ORGANIZATION_ID: the Polar organization that issues the keys.
 * - POLAR_ACCESS_TOKEN (optional): an organization access token with the
 *   license_keys:write scope, for Polar's server-side endpoint. Without it the
 *   public customer-portal endpoint is used, which needs no token.
 * - POLAR_BENEFIT_ID (optional): only accept keys of this benefit.
 * - POLAR_SERVER (optional): "sandbox" to test against sandbox.polar.sh.
 * - PRO_LICENSE_KEYS (optional): extra keys, comma separated, that are always
 *   valid: your own, a gift, or one for automated tests.
 */

export type LicenseCheck =
  | { valid: true; source: "polar" | "static"; expiresAt: string | null }
  | { valid: false; reason: "missing" | "invalid" | "expired" | "unconfigured" | "unavailable" }

const apiOrigin = () =>
  process.env.POLAR_SERVER === "sandbox" ? "https://sandbox-api.polar.sh" : "https://api.polar.sh"

const staticKeys = () =>
  new Set(
    (process.env.PRO_LICENSE_KEYS ?? "")
      .split(/[\s,]+/)
      .map((key) => key.trim())
      .filter(Boolean)
  )

/** Results kept in memory per server instance, so an install does not call Polar for every file. */
const cache = new Map<string, { result: LicenseCheck; until: number }>()
const VALID_FOR = 10 * 60 * 1000
const INVALID_FOR = 60 * 1000

const fingerprint = (key: string) => createHash("sha256").update(key).digest("hex")

/** Reads the key from `Authorization: Bearer <key>`, an `x-license-key` header or `?license=`. */
export function licenseKeyFrom(request: Request) {
  const authorization = request.headers.get("authorization")
  const bearer = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]
  const key =
    bearer ?? request.headers.get("x-license-key") ?? new URL(request.url).searchParams.get("license")
  // An unexpanded placeholder means the variable is not set in the project.
  if (!key || /^\$\{.*\}$/.test(key.trim())) return null
  return key.trim()
}

export function isLicensingConfigured() {
  return Boolean(process.env.POLAR_ORGANIZATION_ID) || staticKeys().size > 0
}

export async function checkLicense(key: string | null | undefined): Promise<LicenseCheck> {
  const trimmed = key?.trim()
  if (!trimmed) return { valid: false, reason: "missing" }
  if (staticKeys().has(trimmed)) return { valid: true, source: "static", expiresAt: null }

  const organizationId = process.env.POLAR_ORGANIZATION_ID
  if (!organizationId) return { valid: false, reason: staticKeys().size ? "invalid" : "unconfigured" }

  const id = fingerprint(trimmed)
  const cached = cache.get(id)
  if (cached && cached.until > Date.now()) return cached.result

  const token = process.env.POLAR_ACCESS_TOKEN
  const endpoint = token
    ? `${apiOrigin()}/v1/license-keys/validate`
    : `${apiOrigin()}/v1/customer-portal/license-keys/validate`

  let result: LicenseCheck
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        key: trimmed,
        organization_id: organizationId,
        ...(process.env.POLAR_BENEFIT_ID ? { benefit_id: process.env.POLAR_BENEFIT_ID } : {}),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    })

    if (response.ok) {
      const license = (await response.json()) as { status?: string; expires_at?: string | null }
      const expiresAt = license.expires_at ?? null
      if (license.status !== "granted") result = { valid: false, reason: "invalid" }
      else if (expiresAt && new Date(expiresAt).getTime() < Date.now()) result = { valid: false, reason: "expired" }
      else result = { valid: true, source: "polar", expiresAt }
    } else if (response.status === 404 || response.status === 422 || response.status === 400) {
      // Polar answers 404 for unknown, revoked, disabled and expired keys.
      result = { valid: false, reason: "invalid" }
    } else {
      return { valid: false, reason: "unavailable" }
    }
  } catch {
    return { valid: false, reason: "unavailable" }
  }

  cache.set(id, { result, until: Date.now() + (result.valid ? VALID_FOR : INVALID_FOR) })
  if (cache.size > 5000) cache.delete(cache.keys().next().value!)
  return result
}

/** The message the shadcn CLI shows when a key is refused (it prints the `message` field). */
export function licenseMessage(result: Exclude<LicenseCheck, { valid: true }>, envVar: string, site: string) {
  switch (result.reason) {
    case "missing":
      return `This is a Balick UI Pro item. Set ${envVar} in .env.local to your license key, then run the command again. Get a key at ${site}/pro`
    case "expired":
      return `Your Balick UI Pro license has expired. Renew it at ${site}/pro`
    case "invalid":
      return `This Balick UI Pro license key is not valid. Check ${envVar} in .env.local, or get a key at ${site}/pro`
    case "unconfigured":
      return "Balick UI Pro licenses are not enabled on this deployment."
    case "unavailable":
      return "The license server could not be reached. Try again in a moment."
  }
}
