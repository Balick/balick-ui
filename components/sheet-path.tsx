"use client"

import { usePathname } from "next/navigation"

/** The current path, used as the sheet reference in the footer. */
export function SheetPath() {
  const pathname = usePathname()
  return <span className="font-mono text-[13px] break-all">{pathname}</span>
}
