// Checks the registry items before they are built:
// - every block exports a component named after its file ("pricing-01"
//   exports Pricing01): the composer generates imports from that convention;
// - every npm package an item imports is listed in its `dependencies`, so the
//   CLI installs it (React and Next.js are provided by the project).
import { readFileSync } from "node:fs"

const registry = JSON.parse(readFileSync("registry.json", "utf8"))
const pascal = (name) =>
  name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")
const provided = new Set(["react", "react-dom", "next"])
const packageName = (specifier) =>
  specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/")

const errors = registry.items.flatMap((item) => {
  const itemErrors = []
  const sources = item.files.map((file) => [file.path, readFileSync(file.path, "utf8")])

  if (item.type === "registry:block") {
    const expected = pascal(item.name)
    const [path, source] = sources[0]
    if (!new RegExp(`export function ${expected}\\b`).test(source)) {
      itemErrors.push(`${path} must export function ${expected}`)
    }
  }

  const declared = new Set(item.dependencies ?? [])
  for (const [path, source] of sources) {
    for (const [, specifier] of source.matchAll(/from "([^"]+)"/g)) {
      if (specifier.startsWith("@/") || specifier.startsWith(".")) continue
      const pkg = packageName(specifier)
      if (!provided.has(pkg) && !declared.has(pkg)) {
        itemErrors.push(`${path} imports ${pkg}, missing from ${item.name}'s dependencies`)
      }
    }
  }
  return itemErrors
})

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}
console.log("All blocks are named after their file and declare their dependencies")
