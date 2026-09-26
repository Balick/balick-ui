import Link from "next/link"
import { ArrowRight, Blocks, Code2, Sparkles, Terminal } from "lucide-react"

import { FrameSection } from "@/components/home/frame"
import { InstallPill } from "@/components/home/install-pill"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/registry/balick/ui/blur-fade"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"
import { Marquee } from "@/registry/balick/ui/marquee"
import { ShimmerButton } from "@/registry/balick/ui/shimmer-button"
import BlurFadeDemo from "@/registry/balick/examples/blur-fade-demo"

const stack = ["React 19", "Next.js", "Tailwind CSS v4", "shadcn/ui", "Motion", "TypeScript", "Radix UI", "Vite"]

const features = [
  { icon: Terminal, title: "One command", body: "Install any item with the shadcn CLI. No package, no lock-in." },
  { icon: Code2, title: "Yours to edit", body: "The source lands in your repo. Change anything, it's your code." },
  { icon: Sparkles, title: "Considered motion", body: "Subtle by default and respectful of reduced-motion settings." },
  { icon: Blocks, title: "Open in v0", body: "Every demo opens in v0 to remix it with AI in one click." },
]

function Cell({
  href,
  title,
  className,
  children,
}: {
  href: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn("group relative flex min-h-64 flex-col overflow-hidden bg-background", className)}
    >
      <div inert className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
        {children}
      </div>
      <div className="flex items-center justify-between border-t px-5 py-3 text-sm">
        <span className="font-medium">{title}</span>
        <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 border-x">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <GridPattern
          width={56}
          height={56}
          squares={[[3, 1], [14, 2], [5, 5], [16, 5], [9, 7]]}
          className="[mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,white,transparent)]"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <BlurFade>
            <Link
              href="/compose"
              className="inline-flex items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 text-xs transition-colors hover:bg-accent"
            >
              <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">New</span>
              <span className="text-muted-foreground">Compose a page, install it in one command</span>
              <ArrowRight className="size-3 text-muted-foreground" />
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h1 className="mt-8 text-5xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl">
              Build interfaces that feel crafted.
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-balance text-muted-foreground">
              Minimal, animated components, blocks and templates for shadcn/ui.
              Copy the code, make it yours, ship it.
            </p>
          </BlurFade>
          <BlurFade delay={0.3} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/docs/components"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Browse components
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-10 items-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Read the docs
            </Link>
          </BlurFade>
          <BlurFade delay={0.4} className="mt-8 max-w-full">
            <InstallPill command="npx shadcn@latest add @balick/marquee" />
          </BlurFade>
        </div>
      </section>

      {/* Stack */}
      <FrameSection>
        <Marquee fade duration="35s" gap="3rem" className="py-5">
          {stack.map((item) => (
            <span key={item} className="font-mono text-sm whitespace-nowrap text-muted-foreground">
              {item}
            </span>
          ))}
        </Marquee>
      </FrameSection>

      {/* Showcase */}
      <FrameSection>
        <div className="flex flex-col gap-2 px-6 py-12 sm:px-10">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Components</p>
          <h2 className="text-3xl font-semibold tracking-tight">Live, not screenshots.</h2>
          <p className="max-w-lg text-muted-foreground">
            Every preview on this site is the real component, rendered from the same code you install.
          </p>
        </div>
        <div className="grid gap-px border-t bg-border md:grid-cols-3">
          <Cell href="/docs/components/blur-fade" title="Blur Fade" className="md:col-span-2">
            <BlurFadeDemo />
          </Cell>
          <Cell href="/docs/components/shimmer-button" title="Shimmer Button">
            <ShimmerButton>Get started</ShimmerButton>
          </Cell>
          <Cell href="/docs/components/grid-pattern" title="Grid Pattern">
            <GridPattern
              width={24}
              height={24}
              squares={[[2, 2], [5, 4], [8, 1], [3, 6], [9, 5]]}
              className="[mask-image:radial-gradient(180px_circle_at_center,white,transparent)]"
            />
          </Cell>
          <Cell href="/docs/components/marquee" title="Marquee" className="md:col-span-2">
            <div className="flex w-full flex-col gap-2">
              {[false, true].map((reverse) => (
                <Marquee key={String(reverse)} reverse={reverse} fade duration="25s">
                  {["Hero", "Pricing", "Features", "Testimonials", "FAQ", "Footer"].map((label) => (
                    <span key={label} className="rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground">
                      {label}
                    </span>
                  ))}
                </Marquee>
              ))}
            </div>
          </Cell>
        </div>
      </FrameSection>

      {/* Features */}
      <FrameSection>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background p-6 sm:p-8">
              <Icon className="size-5" strokeWidth={1.5} />
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </FrameSection>

      {/* Call to action */}
      <FrameSection>
        <div className="relative flex flex-col items-center px-6 py-24 text-center">
          <GridPattern className="[mask-image:linear-gradient(to_bottom,transparent,white)]" />
          <h2 className="relative text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start with one component.
          </h2>
          <p className="relative mt-3 max-w-md text-balance text-muted-foreground">
            Blocks are here, templates are on the way. Everything is free and open source.
          </p>
          <Link
            href="/docs/installation"
            className="relative mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </FrameSection>
    </div>
  )
}
