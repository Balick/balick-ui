"use client"

import * as React from "react"

import { SegmentMeter } from "@/registry/balick/ui/segment-meter"

const labels = ["Weak", "Fair", "Good", "Strong"]

function strength(password: string) {
  return [
    password.length >= 8,
    /[A-Z]/.test(password) && /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length
}

export default function SegmentMeterDemo() {
  const [password, setPassword] = React.useState("Balick2026")
  const id = React.useId()

  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <label htmlFor={id} className="text-sm font-medium">
        Password
      </label>
      <input
        id={id}
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="off"
        spellCheck={false}
        className="h-9 rounded-md border bg-background px-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
      <SegmentMeter value={strength(password)} labels={labels} aria-label="Password strength" />
    </div>
  )
}
