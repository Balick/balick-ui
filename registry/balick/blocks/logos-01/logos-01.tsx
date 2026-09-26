import { Box, Hexagon, Layers, Orbit, Triangle, Waves } from "lucide-react"

import { Section } from "@/registry/balick/ui/section"

const title = "Powering the teams behind the products you use every day"

const logos = [
  { name: "Northwind", icon: Triangle },
  { name: "Lumen", icon: Hexagon },
  { name: "Arcadia", icon: Box },
  { name: "Halcyon", icon: Waves },
  { name: "Quanta", icon: Orbit },
  { name: "Stratum", icon: Layers },
]

export function Logos01() {
  return (
    <Section spacing="compact">
      <p className="mx-auto max-w-md text-center text-sm text-balance text-muted-foreground">
        {title}
      </p>
      <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {logos.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="group flex h-24 items-center justify-center gap-2 bg-background text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            <Icon className="size-5" strokeWidth={2.25} aria-hidden />
            {name}
          </li>
        ))}
      </ul>
    </Section>
  )
}
