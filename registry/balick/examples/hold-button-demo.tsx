"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import { HoldButton } from "@/registry/balick/ui/hold-button"

export default function HoldButtonDemo() {
  const [deleted, setDeleted] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-3">
      <HoldButton onConfirm={() => setDeleted((count) => count + 1)}>
        <Trash2 aria-hidden />
        Hold to delete
      </HoldButton>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {deleted === 0 ? "Press and hold the button." : `Deleted ${deleted} ${deleted === 1 ? "time" : "times"}.`}
      </p>
    </div>
  )
}
