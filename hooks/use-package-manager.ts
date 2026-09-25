"use client"

import * as React from "react"

export const packageManagers = ["pnpm", "npm", "yarn", "bun"] as const
export type PackageManager = (typeof packageManagers)[number]

const STORAGE_KEY = "balick:package-manager"
const listeners = new Set<() => void>()
let current: PackageManager = "pnpm"

function read(): PackageManager {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (packageManagers.includes(stored as PackageManager)) {
      current = stored as PackageManager
    }
  } catch {}
  return current
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Package manager preference shared by every install command on the page. */
export function usePackageManager() {
  const value = React.useSyncExternalStore(subscribe, read, () => "pnpm" as const)

  const setValue = React.useCallback((next: PackageManager) => {
    current = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    listeners.forEach((listener) => listener())
  }, [])

  return [value, setValue] as const
}
