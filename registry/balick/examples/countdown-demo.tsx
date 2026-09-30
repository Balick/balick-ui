"use client"

import * as React from "react"

import { Countdown } from "@/registry/balick/ui/countdown"

export default function CountdownDemo() {
  // A launch three days and a few hours away, whenever the demo is opened.
  const [launch] = React.useState(() => Date.now() + ((3 * 24 + 7) * 60 + 42) * 60 * 1000)

  return <Countdown to={launch} className="text-3xl sm:text-4xl" />
}
