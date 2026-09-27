// Copies the colour tokens from app/globals.css into the "theme" registry
// item, so the theme users install never drifts from the one on the site.
import { readFileSync, writeFileSync } from "node:fs"

/** Tokens used by the docs site only, not part of the installable theme. */
const SITE_ONLY = new Set(["code", "rule", "mark"])

const css = readFileSync("app/globals.css", "utf8")

function readTokens(selector) {
  const escaped = selector.replace(".", "\\.")
  const block = css.match(new RegExp(`^${escaped} \\{([^}]*)\\}`, "m"))
  if (!block) throw new Error(`No top-level "${selector}" block in app/globals.css`)

  const tokens = {}
  for (const [, name, value] of block[1].matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    if (!SITE_ONLY.has(name)) tokens[name] = value.trim()
  }
  return tokens
}

const registry = JSON.parse(readFileSync("registry.json", "utf8"))
const theme = registry.items.find((item) => item.name === "theme")
if (!theme) throw new Error('No "theme" item in registry.json')

theme.cssVars = { light: readTokens(":root"), dark: readTokens(".dark") }
writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`)
console.log(
  `Synced ${Object.keys(theme.cssVars.light).length} theme tokens from app/globals.css`
)
