import {
  ArrowRight,
  Box,
  Hexagon,
  Layers,
  Orbit,
  Triangle,
  Waves,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/registry/balick/ui/blur-fade"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"
import { Marquee } from "@/registry/balick/ui/marquee"
import { Section } from "@/registry/balick/ui/section"
import { ShimmerButton } from "@/registry/balick/ui/shimmer-button"

const logos = [
  { name: "Northwind", icon: Triangle },
  { name: "Lumen", icon: Zap },
  { name: "Arcadia", icon: Hexagon },
  { name: "Vertex", icon: Box },
  { name: "Halcyon", icon: Waves },
  { name: "Quanta", icon: Orbit },
  { name: "Stratum", icon: Layers },
]

const bars = [32, 48, 40, 64, 52, 72, 60, 84, 70, 92, 78, 100]

function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)]">
      <div className="flex h-10 items-center gap-1.5 border-b px-4">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="mx-auto h-5 w-48 rounded-md bg-muted" />
      </div>
      <div className="grid grid-cols-[160px_1fr] max-sm:grid-cols-1">
        <div className="flex flex-col gap-2 border-r p-4 max-sm:hidden">
          {[70, 55, 80, 45, 60].map((width, i) => (
            <span
              key={i}
              style={{ width: `${width}%` }}
              className="h-2.5 rounded-full bg-muted first:bg-foreground/20"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Revenue", value: "$48.2k" },
              { label: "Users", value: "12,480" },
              { label: "Uptime", value: "99.99%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border p-3 text-left">
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-sm font-semibold tracking-tight sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex h-36 items-end gap-1.5 rounded-lg border p-3 sm:gap-2">
            {bars.map((height, i) => (
              <span
                key={i}
                style={{ height: `${height}%` }}
                className="flex-1 rounded-sm bg-foreground/10 last:bg-foreground"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero01({ id = "hero" }: { id?: string }) {
  return (
    <Section id={id} spacing="none" className="overflow-hidden">
      <GridPattern
        width={48}
        height={48}
        squares={[[4, 2], [10, 1], [16, 3], [7, 6], [20, 5], [2, 8]]}
        className="[mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,white,transparent)]"
      />
      <div className="relative flex flex-col items-center pt-24 text-center sm:pt-32">
        <BlurFade>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 text-xs transition-colors hover:bg-accent"
          >
            <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">
              v2.0
            </span>
            <span className="text-muted-foreground">Read the changelog</span>
            <ArrowRight className="size-3 text-muted-foreground" />
          </a>
        </BlurFade>
        <BlurFade delay={0.1}>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl">
            The platform for teams that ship.
          </h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-balance text-muted-foreground">
            Build, deploy and monitor your product from one place. Fast by
            default, secure by design, delightful to use.
          </p>
        </BlurFade>
        <BlurFade
          delay={0.3}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ShimmerButton>
            Start for free
            <ArrowRight className="size-4" />
          </ShimmerButton>
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <a href="#">Book a demo</a>
          </Button>
        </BlurFade>
        <BlurFade delay={0.35}>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · Free 14-day trial
          </p>
        </BlurFade>
        <BlurFade delay={0.45} offset={24} className="mt-16 w-full max-w-5xl">
          <ProductPreview />
        </BlurFade>
      </div>
      <div className="relative pt-20 pb-24 sm:pb-32">
        <p className="text-center font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Trusted by fast-moving teams
        </p>
        <Marquee fade pauseOnHover gap="3.5rem" duration="30s" className="mt-8">
          {logos.map(({ name, icon: Icon }) => (
            <span
              key={name}
              className="flex items-center gap-2 text-lg font-semibold tracking-tight whitespace-nowrap text-muted-foreground/80"
            >
              <Icon className="size-5" strokeWidth={2.25} />
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
