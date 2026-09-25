import type { PackageManager } from "@/hooks/use-package-manager"

export type Commands = Record<PackageManager, string>

export function shadcn(args: string): Commands {
  return {
    pnpm: `pnpm dlx shadcn@latest ${args}`,
    npm: `npx shadcn@latest ${args}`,
    yarn: `yarn shadcn@latest ${args}`,
    bun: `bunx --bun shadcn@latest ${args}`,
  }
}

export function shadcnAdd(target: string): Commands {
  return shadcn(`add ${target}`)
}

export function installDependencies(deps: string[]): Commands {
  const list = deps.join(" ")
  return {
    pnpm: `pnpm add ${list}`,
    npm: `npm install ${list}`,
    yarn: `yarn add ${list}`,
    bun: `bun add ${list}`,
  }
}
