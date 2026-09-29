"use client"

import * as React from "react"

import { RelativeTime } from "@/registry/balick/ui/relative-time"

export default function RelativeTimeDemo() {
  const [published] = React.useState(() => Date.now() - 5 * 60 * 1000)

  return (
    <p className="text-sm text-muted-foreground">
      Last deploy <RelativeTime date={published} className="font-medium text-foreground" />
    </p>
  )
}
