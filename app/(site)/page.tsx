import Link from "next/link"
import {
  Accessibility,
  ArrowRight,
  Code2,
  GripVertical,
  Layers,
  Plus,
  SunMoon,
} from "lucide-react"

import { CategoryGrid } from "@/components/category-grid"
import { Anatomy } from "@/components/home/anatomy"
import { InstallPill } from "@/components/home/install-pill"
import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { installTarget } from "@/config/site"
import { blockList } from "@/content/blocks"
import { componentDocs } from "@/content/components"
import { galleryCategories } from "@/lib/blocks-gallery"
import { composeInstallTarget, starterComposition } from "@/lib/compose"
import { cn } from "@/lib/utils"
import BlurFadeDemo from "@/registry/balick/examples/blur-fade-demo"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"
import { Marquee } from "@/registry/balick/ui/marquee"
import { ShimmerButton } from "@/registry/balick/ui/shimmer-button"

const pad = "px-4 md:px-6"

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]

const principles = [
  {
    icon: Layers,
    title: "One system",
    body: "Every block uses the same container, spacing and type scale, so any combination reads as one page.",
  },
  {
    icon: Code2,
    title: "Yours to edit",
    body: "The CLI copies the source into your project. No package to update, no lock-in.",
  },
  {
    icon: SunMoon,
    title: "Light and dark",
    body: "Designed and checked in both modes, from 320px phones to wide screens.",
  },
  {
    icon: Accessibility,
    title: "Accessible, quiet motion",
    body: "Landmarks, labelled controls, keyboard support, and motion that respects reduced-motion settings.",
  },
]

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  )
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
    >
      {children}
    </Link>
  )
}

/** Eyebrow, title and description of a section, each on its own ruled row. */
function Intro({
  index,
  label,
  title,
  description,
}: {
  index: string
  label: string
  title: React.ReactNode
  description: React.ReactNode
}) {
  return (
    <>
      <Row>
        <SheetLabel index={index} className={cn(pad, "justify-center py-3")}>
          {label}
        </SheetLabel>
      </Row>
      <Row>
        <h2 className={cn(pad, "py-2 text-center text-4xl font-semibold tracking-tighter text-balance sm:text-5xl")}>
          {title}
        </h2>
      </Row>
      <Row>
        <p className={cn(pad, "mx-auto max-w-2xl py-3 text-center text-lg text-balance text-muted-foreground")}>
          {description}
        </p>
      </Row>
    </>
  )
}

export default function HomePage() {
  const categories = galleryCategories()

  return (
    <div className="sheet">
      {/* Hero */}
      <Spacer className="h-16 sm:h-24" />
      <Row>
        <div className={cn(pad, "py-3 text-center")}>
          <Link
            href="/compose"
            className="inline-flex max-w-full items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-xs shadow-xs transition-colors hover:bg-accent"
          >
            <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">New</span>
            <span className="truncate text-muted-foreground">
              The composer: build a page from blocks, install it in one command
            </span>
            <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
          </Link>
        </div>
      </Row>
      <h1 className="text-center text-[clamp(2.25rem,10.5vw,3rem)] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-8xl">
        <Row as="span" className={cn(pad, "pt-2 pb-1 leading-[1.05]")}>
          Blocks designed
        </Row>
        <Row as="span" className={cn(pad, "pt-2 pb-1 leading-[1.05]")}>
          to fit together.
        </Row>
      </h1>
      <Row>
        <p className={cn(pad, "mx-auto max-w-2xl py-4 text-center text-lg text-balance text-muted-foreground")}>
          Sections for shadcn/ui built on one set of primitives. Pick them, arrange them in the
          composer, then install the whole page with a single command.
        </p>
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          <PrimaryLink href="/compose">Open the composer</PrimaryLink>
          <SecondaryLink href="/blocks">Browse blocks</SecondaryLink>
        </div>
      </Row>
      <Row>
        <div className={cn(pad, "py-4 text-center")}>
          <InstallPill command={`npx shadcn@latest add ${installTarget("hero-01")}`} />
        </div>
      </Row>

      {/* Anatomy */}
      <Spacer marks />
      <Intro
        index="01"
        label="Anatomy of a page"
        title={`${numberWords[starterComposition.length] ?? starterComposition.length} blocks. One page.`}
        description="Every block is built on the same Section, Container and SectionHeader primitives. Stack any of them and the page still reads as one."
      />
      <Row>
        <div className={cn(pad, "py-12 sm:py-16")}>
          <Anatomy blocks={starterComposition} />
        </div>
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          <PrimaryLink href="/compose">Try the composer</PrimaryLink>
        </div>
      </Row>

      {/* Figures */}
      <Spacer marks />
      <Row>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {[
            { value: blockList.length, label: "Blocks" },
            { value: categories.length, label: "Categories" },
            { value: componentDocs.length, label: "Components" },
            { value: 1, label: "Command to install a page" },
          ].map((figure, index) => (
            <div
              key={figure.label}
              className={cn(
                "flex flex-col gap-2 border-rule px-4 py-8 md:px-6",
                index % 2 === 0 && "border-r",
                index < 2 && "border-b md:border-b-0",
                index === 1 && "md:border-r",
                index === 2 && "md:border-r"
              )}
            >
              <dt className="order-last font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                {figure.label}
              </dt>
              <dd className="text-5xl font-semibold tracking-tighter tabular-nums">{figure.value}</dd>
            </div>
          ))}
        </dl>
      </Row>

      {/* Catalogue */}
      <Spacer marks />
      <Intro
        index="02"
        label="Blocks"
        title="Every section a site needs."
        description={`${categories.length} categories, from the navbar to the footer. Preview each block at any width, then add it with one command.`}
      />
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <CategoryGrid compact />
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          <PrimaryLink href="/blocks">Browse all blocks</PrimaryLink>
        </div>
      </Row>

      {/* Composer */}
      <Spacer marks />
      <Intro
        index="03"
        label="Composer"
        title="Compose, preview, install."
        description="Build a page in the browser. The link keeps your composition, and one command adds the page and every block it uses to your project."
      />
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <ol className="grid grid-cols-1 md:grid-cols-3">
          <Step index="01" title="Pick" body="Add sections from every category. Each one lands where it belongs on the page.">
            <span className="flex flex-col gap-1.5">
              {["Hero", "Pricing", "FAQ"].map((label) => (
                <span key={label} className="flex items-center justify-between rounded-md border bg-card px-3 py-2 text-xs shadow-xs">
                  {label}
                  <Plus className="size-3.5 text-muted-foreground" />
                </span>
              ))}
            </span>
          </Step>
          <Step index="02" title="Arrange" body="Drag sections into order and preview the page live, on desktop, tablet or phone.">
            <span className="flex flex-col gap-1.5">
              {["Navbar", "Hero", "Features"].map((label, index) => (
                <span
                  key={label}
                  className={cn(
                    "flex items-center gap-2 rounded-md border bg-card px-2 py-2 text-xs shadow-xs",
                    index === 2 && "translate-x-3 -rotate-1 shadow-md"
                  )}
                >
                  <GripVertical className="size-3.5 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground">{index + 1}</span>
                  {label}
                </span>
              ))}
            </span>
          </Step>
          <Step index="03" title="Install" body="One command writes the page and installs every block with its dependencies.">
            <span className="surface-code block overflow-hidden rounded-md px-3 py-2.5 font-mono text-[11px] leading-5">
              <span className="text-muted-foreground">$ </span>
              npx shadcn@latest add
              <span className="block truncate text-muted-foreground">
                {composeInstallTarget(starterComposition.slice(0, 4))}
              </span>
            </span>
          </Step>
        </ol>
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          <PrimaryLink href="/compose">Open the composer</PrimaryLink>
        </div>
      </Row>

      {/* Principles */}
      <Spacer marks />
      <Intro
        index="04"
        label="Principles"
        title="Quiet, consistent, yours."
        description="Production-ready sections that stay out of the way of your content."
      />
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, body }, index) => (
            <div
              key={title}
              className={cn(
                "border-rule p-6 md:px-6 md:py-8",
                index < principles.length - 1 && "border-b lg:border-b-0",
                index % 2 === 0 && "sm:border-r",
                index === 1 && "lg:border-r",
                index === 2 && "sm:border-b-0"
              )}
            >
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Row>

      {/* Components */}
      <Spacer marks />
      <Intro
        index="05"
        label="Components"
        title="The pieces underneath."
        description="The animated components the blocks are made of, also available on their own. Every preview is the real component."
      />
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Showcase href="/docs/components/blur-fade" title="Blur Fade" className="md:col-span-2 md:border-r">
            <BlurFadeDemo />
          </Showcase>
          <Showcase href="/docs/components/shimmer-button" title="Shimmer Button" className="border-t md:border-t-0">
            <ShimmerButton>Get started</ShimmerButton>
          </Showcase>
          <Showcase href="/docs/components/grid-pattern" title="Grid Pattern" className="border-t md:border-r">
            <GridPattern
              width={24}
              height={24}
              squares={[[2, 2], [5, 4], [8, 1], [3, 6], [9, 5]]}
              className="[mask-image:radial-gradient(180px_circle_at_center,white,transparent)]"
            />
          </Showcase>
          <Showcase href="/docs/components/marquee" title="Marquee" className="border-t md:col-span-2">
            <div className="flex w-full flex-col gap-2">
              {[false, true].map((reverse) => (
                <Marquee key={String(reverse)} reverse={reverse} fade duration="25s">
                  {["Hero", "Pricing", "Features", "Testimonials", "FAQ", "Footer"].map((label) => (
                    <span key={label} className="rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-xs">
                      {label}
                    </span>
                  ))}
                </Marquee>
              ))}
            </div>
          </Showcase>
        </div>
      </Row>

      {/* Closing */}
      <Spacer marks className="h-16 sm:h-24" />
      <h2 className="text-center text-4xl font-semibold tracking-tighter sm:text-6xl">
        <Row as="span" className={cn(pad, "py-2")}>
          Start with a page.
        </Row>
      </h2>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          <PrimaryLink href="/compose">Open the composer</PrimaryLink>
          <SecondaryLink href="/docs/installation">Read the installation guide</SecondaryLink>
        </div>
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}

function Step({
  index,
  title,
  body,
  children,
}: {
  index: string
  title: string
  body: string
  children: React.ReactNode
}) {
  return (
    <li className="flex flex-col border-rule p-6 not-last:border-b md:not-last:border-r md:not-last:border-b-0 md:px-6 md:py-8">
      <span aria-hidden className="flex h-32 flex-col justify-center rounded-lg bg-hatch px-6">
        {children}
      </span>
      <span className="mt-6 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
        Step {index}
      </span>
      <h3 className="mt-1 font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </li>
  )
}

function Showcase({
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
    <Link href={href} className={cn("group flex min-h-72 flex-col border-rule", className)}>
      <span className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 text-sm md:px-6">
        <span className="font-medium">{title}</span>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
      </span>
      <span inert className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
        {children}
      </span>
    </Link>
  )
}
