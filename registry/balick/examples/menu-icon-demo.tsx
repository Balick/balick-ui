"use client"

import * as React from "react"

import { MenuIcon } from "@/registry/balick/ui/menu-icon"

export default function MenuIconDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
      className="inline-flex size-10 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
    >
      <MenuIcon open={open} className="size-5" />
    </button>
  )
}
