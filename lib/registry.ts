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

/**
 * Reads the first file of a registry item and rewrites internal import paths
 * to the ones users get after installing with the shadcn CLI.
 */
export async function getRegistrySource(name: string) {
  const item = getRegistryItem(name)
  const file = item?.files[0]
  if (!file) return null

  const source = await fs.readFile(path.join(process.cwd(), file.path), "utf8")
  return source.replaceAll("@/registry/balick/components/", "@/components/ui/")
}
