// Every block must export a component named after its file ("pricing-01"
// exports Pricing01): the composer generates imports from that convention.
import { readFileSync } from "node:fs"

const registry = JSON.parse(readFileSync("registry.json", "utf8"))
const pascal = (name) =>
  name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")

const errors = registry.items
  .filter((item) => item.type === "registry:block")
  .flatMap((item) => {
    const expected = pascal(item.name)
    const source = readFileSync(item.files[0].path, "utf8")
    return new RegExp(`export function ${expected}\\b`).test(source)
      ? []
      : [`${item.files[0].path} must export function ${expected}`]
  })

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}
console.log("All blocks export a component named after their file")
