"use client"

import * as React from "react"

import { Crossfade } from "@/registry/balick/ui/crossfade"
import { SegmentedControl } from "@/registry/balick/ui/segmented-control"

const plans = {
  monthly: { price: "$12", note: "Billed every month" },
  yearly: { price: "$9", note: "Billed once a year, 25% off" },
  lifetime: { price: "$199", note: "Pay once, keep it forever" },
}

type Plan = keyof typeof plans

const options = [
  { value: "monthly" as const, label: "Monthly" },
  { value: "yearly" as const, label: "Yearly" },
  { value: "lifetime" as const, label: "Lifetime" },
]

export default function CrossfadeDemo() {
  const [plan, setPlan] = React.useState<Plan>("yearly")

  return (
    <div className="flex flex-col items-center gap-5">
      <SegmentedControl aria-label="Plan" value={plan} onValueChange={setPlan} options={options} />
      <Crossfade value={plan} className="h-20 w-56 text-center">
        <p className="text-4xl font-semibold tracking-tighter">{plans[plan].price}</p>
        <p className="mt-1 text-sm text-muted-foreground">{plans[plan].note}</p>
      </Crossfade>
    </div>
  )
}
