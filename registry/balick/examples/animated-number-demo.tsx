"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedNumber } from "@/registry/balick/ui/animated-number"

export default function AnimatedNumberDemo() {
  const [seats, setSeats] = React.useState(5)

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="flex items-baseline text-4xl font-semibold tracking-tighter">
        $<AnimatedNumber value={seats * 19} />
        <span className="ml-2 text-sm font-normal tracking-normal text-muted-foreground">
          / month
        </span>
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          aria-label="Remove a seat"
          disabled={seats <= 1}
          onClick={() => setSeats((value) => value - 1)}
        >
          <Minus />
        </Button>
        <span className="w-16 text-center text-sm text-muted-foreground tabular-nums">
          {seats} {seats === 1 ? "seat" : "seats"}
        </span>
        <Button
          variant="outline"
          size="icon"
          aria-label="Add a seat"
          onClick={() => setSeats((value) => value + 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}
