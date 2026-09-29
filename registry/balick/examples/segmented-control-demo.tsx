"use client"

import * as React from "react"

import { SegmentedControl } from "@/registry/balick/ui/segmented-control"

const options = [
  { value: "monthly" as const, label: "Monthly" },
  { value: "yearly" as const, label: "Yearly", badge: "−20%" },
]

export default function SegmentedControlDemo() {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("yearly")

  return (
    <SegmentedControl
      aria-label="Billing period"
      value={billing}
      onValueChange={setBilling}
      options={options}
    />
  )
}
