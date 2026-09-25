import { promises as fs } from "node:fs"
import path from "node:path"

import registry from "@/registry.json"

export type RegistryItem = (typeof registry.items)[number] & {
  dependencies?: string[]
  registryDependencies?: string[]
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
