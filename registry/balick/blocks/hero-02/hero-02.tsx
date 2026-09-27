import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/registry/balick/ui/blur-fade"
import { Section } from "@/registry/balick/ui/section"

const content = {
  badge: { label: "New", text: "Preview deployments for every branch", href: "#" },
  title: "Deploy with total confidence.",
  description:
    "Every push is built, checked and shipped to the edge in seconds. Roll back in one click if anything looks off.",
  primary: { label: "Start deploying", href: "#" },
  secondary: { label: "Read the docs", href: "#" },
}

const stats = [
  { value: "14s", label: "Median build" },
  { value: "312", label: "Edge locations" },
  { value: "99.99%", label: "Uptime" },
]

const log = [
  { text: "Build completed in 14s", done: true },
  { text: "142 checks passed", done: true },
  { text: "Deployed to 312 edge locations", done: true },
]

function DeployTerminal() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border bg-background shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)]">
        <div className="flex h-10 items-center gap-1.5 border-b px-4">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">~/acme</span>
        </div>
        {/* Bottom padding leaves room for the floating status card. */}
        <div className="flex flex-col gap-3 px-5 pt-5 pb-14 font-mono text-[13px] leading-5 sm:px-6 sm:pt-6">
          <p>
            <span className="text-muted-foreground">$</span> acme deploy --prod
          </p>
          {log.map((line, i) => (
            <BlurFade key={line.text} delay={0.5 + i * 0.15} direction="left" offset={6}>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Check className="size-3.5 text-foreground" aria-hidden />
                {line.text}
              </p>
            </BlurFade>
          ))}
          <BlurFade delay={0.95} direction="left" offset={6}>
            <p className="flex flex-wrap items-center gap-x-2">
              <ArrowRight className="size-3.5" aria-hidden />
              <span className="underline underline-offset-4">acme.com</span>
              <span className="rounded bg-foreground px-1.5 text-[11px] leading-5 text-background">
                Ready
              </span>
            </p>
          </BlurFade>
        </div>
      </div>
      <BlurFade
        delay={1.1}
        offset={12}
        className="absolute -bottom-6 left-4 sm:-left-6"
      >
        <div className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <div className="text-xs">
            <p className="font-medium">Preview ready</p>
            <p className="text-muted-foreground">feat/checkout · 32s ago</p>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}

export function Hero02({ id = "hero" }: { id?: string }) {
  return (
    <Section id={id} spacing="none">
      <div className="grid grid-cols-1 items-center gap-16 py-24 sm:py-32 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          <BlurFade>
            <a
              href={content.badge.href}
              className="inline-flex items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 text-xs transition-colors hover:bg-accent"
            >
              <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">
                {content.badge.label}
              </span>
              <span className="text-muted-foreground">{content.badge.text}</span>
              <ArrowRight className="size-3 text-muted-foreground" />
            </a>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h1 className="mt-8 text-5xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl">
              {content.title}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-balance text-muted-foreground">
              {content.description}
            </p>
          </BlurFade>
          <BlurFade delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href={content.primary.href}>
                {content.primary.label}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={content.secondary.href}>{content.secondary.label}</a>
            </Button>
          </BlurFade>
          <BlurFade delay={0.4} className="mt-12 w-full">
            <dl className="grid max-w-md grid-cols-3 divide-x border-y">
              {stats.map((stat) => (
                <div key={stat.label} className="px-4 py-4 first:pl-0">
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </BlurFade>
        </div>
        <BlurFade delay={0.35} offset={24} className="pb-6 lg:pl-6">
          <DeployTerminal />
        </BlurFade>
      </div>
    </Section>
  )
}
