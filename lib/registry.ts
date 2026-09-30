import { promises as fs } from "node:fs"
import path from "node:path"

import registry from "@/registry.json"

type RegistryItem = (typeof registry.items)[number] & {
  dependencies?: string[]
  registryDependencies?: string[]
}

/** An item as `shadcn build` wrote it to public/r, with the content of its files. */
export interface BuiltItem {
  name: string
  type: string
  files?: { path: string; type: string; target?: string; content?: string }[]
  dependencies?: string[]
  registryDependencies?: string[]
  css?: Record<string, unknown>
  cssVars?: { theme?: Record<string, string> } & Record<string, unknown>
  [key: string]: unknown
}

/** Reads a built item (public/r/<name>.json), or nothing if there is none. */
export async function readBuiltItem(name: string) {
  try {
    const file = path.join(process.cwd(), "public/r", `${name}.json`)
    return JSON.parse(await fs.readFile(file, "utf8")) as BuiltItem
  } catch {
    return undefined
  }
}

export function getRegistryItem(name: string) {
  return registry.items.find((item) => item.name === name) as
    | RegistryItem
    | undefined
}

/** Rewrites internal import paths to the ones users get after installing. */
function toInstalledSource(source: string) {
  return source.replaceAll("@/registry/balick/ui/", "@/components/ui/")
}

/** Reads the first file of a registry item. */
export async function getRegistrySource(name: string) {
  const files = await getRegistryFiles(name)
  return files[0]?.code ?? null
}

/** Reads every file of a registry item, with the path it is installed to. */
export async function getRegistryFiles(name: string) {
  const item = getRegistryItem(name)
  if (!item) return []

  return Promise.all(
    (item.files ?? []).map(async (file) => {
      const source = await fs.readFile(path.join(process.cwd(), file.path), "utf8")
      return {
        path: `${file.type === "registry:ui" ? "components/ui" : "components"}/${path.basename(file.path)}`,
        code: toInstalledSource(source),
      }
    })
  )
}
