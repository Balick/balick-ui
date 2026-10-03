"use client"

import * as React from "react"
import { Bell, Mail } from "lucide-react"

import { CountBadge } from "@/registry/balick/ui/count-badge"

export default function CountBadgeDemo() {
  const [count, setCount] = React.useState(3)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        <CountBadge count={count} label="unread notifications">
          <span className="flex size-10 items-center justify-center rounded-full border bg-card shadow-xs">
            <Bell className="size-4" />
          </span>
        </CountBadge>
        <CountBadge count={128} label="unread messages" tone="neutral">
          <span className="flex size-10 items-center justify-center rounded-full border bg-card shadow-xs">
            <Mail className="size-4" />
          </span>
        </CountBadge>
        <CountBadge count={1} dot tone="success" label="Lina is online">
          <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
            L
          </span>
        </CountBadge>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="h-8 cursor-pointer rounded-md border bg-card px-3 text-sm shadow-xs transition-colors hover:bg-accent"
        >
          Notify
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="h-8 cursor-pointer rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
