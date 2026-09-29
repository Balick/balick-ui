import { siteConfig } from "@/config/site"

/*
 * v0 writes each file at its `target`, or at its `path` when there is none,
 * while the build rewrites imports to `@/components/ui/*`. Our files only have
 * a repository path, so v0 needs a variant of every item with explicit
 * targets. The shadcn CLI keeps using the plain items, which leave placement
 * to each project's aliases.
 */

interface RegistryFile {
  path: string
  type: string
  target?: string
  content?: string
}

interface RegistryItem {
  files?: RegistryFile[]
  registryDependencies?: string[]
  [key: string]: unknown
}

const folders: Record<string, string> = {
  "registry:ui": "components/ui",
  "registry:component": "components",
  "registry:block": "components",
  "registry:example": "components",
  "registry:hook": "hooks",
  "registry:lib": "lib",
}

const registryBase = `${siteConfig.url}/r/`

/** URL of the v0 variant of a registry item, e.g. /r/v0/hero-01.json. */
export function v0RegistryUrl(name: string) {
  return `${registryBase}v0/${name}.json`
}

function toV0Dependency(dependency: string) {
  return dependency.startsWith(registryBase)
    ? `${registryBase}v0/${dependency.slice(registryBase.length)}`
    : dependency
}

/** Rewrites repository imports to where the targets put the files. */
function toV0Imports(content: string) {
  return content
    .replace(/@\/registry\/balick\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/balick\/(?:blocks|examples)\/(?:[\w-]+\/)?([\w-]+)/g, "@/components/$1")
}

/**
 * The same item, ready for v0: a target for every file, imports that match
 * those targets, and v0 variants as dependencies.
 */
export function toV0Item<T extends RegistryItem>(item: T): T {
  return {
    ...item,
    registryDependencies: item.registryDependencies?.map(toV0Dependency),
    files: item.files?.map((file) => {
      const folder = folders[file.type]
      const content = file.content && toV0Imports(file.content)
      if (file.target || !folder) return { ...file, content }
      return { ...file, content, target: `${folder}/${file.path.split("/").pop()}` }
    }),
  }
}
