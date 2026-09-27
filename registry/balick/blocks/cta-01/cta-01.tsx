import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"
import { Section } from "@/registry/balick/ui/section"

const content = {
  title: "Ship your next release today.",
  description: "Start for free, invite your team, and deploy in minutes. No credit card required.",
  primary: { label: "Start for free", href: "#" },
  secondary: { label: "Talk to sales", href: "#" },
}

export function Cta01({ id = "cta" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="relative isolate overflow-hidden rounded-2xl bg-foreground px-6 py-20 text-center text-background sm:px-16 sm:py-24">
        <GridPattern
          width={40}
          height={40}
          squares={[[2, 1], [6, 3], [12, 2], [17, 4], [22, 1], [9, 5]]}
          className="-z-10 fill-background/[0.04] stroke-background/10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,white,transparent)]"
        />
        <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tighter text-balance sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-balance opacity-70">
          {content.description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <a href={content.primary.href}>
              {content.primary.label}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <a
            href={content.secondary.href}
            className="inline-flex h-10 items-center px-4 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            {content.secondary.label}
          </a>
        </div>
      </div>
    </Section>
  )
}
