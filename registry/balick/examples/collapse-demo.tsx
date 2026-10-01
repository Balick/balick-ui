"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Collapse } from "@/registry/balick/ui/collapse"

export default function CollapseDemo() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <div className="w-full max-w-xs rounded-lg border bg-card">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-sm font-medium"
      >
        What is included?
        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <Collapse id={id} open={open}>
        <p className="px-4 pb-4 text-sm leading-6 text-muted-foreground">
          Every block and component, the source code for each, and updates through the CLI. The
          panel grows to fit its content, whatever its height.
        </p>
      </Collapse>
    </div>
  )
}
