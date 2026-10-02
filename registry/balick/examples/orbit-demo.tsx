import type * as React from "react"
import { Cloud, Database, Lock, Mail, Zap } from "lucide-react"

import { Orbit } from "@/registry/balick/ui/orbit"

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-9 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-xs [&_svg]:size-4">
      {children}
    </div>
  )
}

export default function OrbitDemo() {
  return (
    <Orbit
      size="13rem"
      duration="40s"
      center={
        <Orbit size="6.5rem" duration="24s" reverse center={<Zap className="size-5" />}>
          <Chip><Lock /></Chip>
          <Chip><Mail /></Chip>
          <Chip><Cloud /></Chip>
        </Orbit>
      }
    >
      <Chip><Database /></Chip>
      <Chip><Cloud /></Chip>
      <Chip><Mail /></Chip>
      <Chip><Lock /></Chip>
      <Chip><Zap /></Chip>
    </Orbit>
  )
}
