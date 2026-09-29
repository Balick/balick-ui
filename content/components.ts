export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

interface PropGroup {
  title: string
  props: PropDef[]
}

export type ComponentCategory =
  | "buttons"
  | "text"
  | "motion"
  | "backgrounds"
  | "indicators"
  | "icons"
  | "layout"

/** Categories in display order, used by the sidebar and the components index. */
export const componentCategories: {
  slug: ComponentCategory
  title: string
  description: string
}[] = [
  { slug: "buttons", title: "Buttons", description: "Buttons and controls with quiet, deliberate feedback." },
  { slug: "text", title: "Text & numbers", description: "Words and figures that change without shouting." },
  { slug: "motion", title: "Motion", description: "Reveals and loops that support the content." },
  { slug: "backgrounds", title: "Backgrounds", description: "Patterns that sit behind a section." },
  { slug: "indicators", title: "Indicators", description: "Small signals of state." },
  { slug: "icons", title: "Icons", description: "Icons lucide-react does not ship." },
  { slug: "layout", title: "Layout", description: "The primitives every block is built on." },
]

export interface ComponentDoc {
  slug: string
  title: string
  category: ComponentCategory
  description: string
  /** Registry item name of the demo rendered in the preview. */
  example: string
  usage: string
  props?: PropDef[]
  /** Use instead of `props` when the item exports several components. */
  propGroups?: PropGroup[]
  /** CSS users add to their global stylesheet when installing manually. */
  css?: string
  /** Shown with a "New" badge in navigation. */
  isNew?: boolean
}

export const componentDocs: ComponentDoc[] = [
  {
    slug: "animated-number",
    category: "text",
    title: "Animated Number",
    description:
      "A number that rolls up or down to its new value when it changes, such as a price or a total.",
    example: "animated-number-demo",
    isNew: true,
    usage: `import { AnimatedNumber } from "@/components/ui/animated-number"

export function Price({ amount }: { amount: number }) {
  return (
    <p className="text-4xl font-semibold">
      $<AnimatedNumber value={amount} />
    </p>
  )
}`,
    props: [
      { name: "value", type: "number", description: "The number to display. Required." },
      { name: "format", type: "(value: number) => string", description: "Turns the value into text. Defaults to en-US digit grouping." },
    ],
  },
  {
    slug: "blur-fade",
    category: "motion",
    title: "Blur Fade",
    description:
      "Reveal content with a soft blur and fade, on mount or when scrolled into view.",
    example: "blur-fade-demo",
    usage: `import { BlurFade } from "@/components/ui/blur-fade"

export function Hero() {
  return (
    <BlurFade delay={0.2} inView>
      <h1>Hello world</h1>
    </BlurFade>
  )
}`,
    props: [
      { name: "duration", type: "number", default: "0.4", description: "Animation duration in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before the animation starts, in seconds." },
      { name: "offset", type: "number", default: "8", description: "Distance travelled by the element, in pixels." },
      { name: "direction", type: '"up" | "down" | "left" | "right"', default: '"down"', description: "Direction the element comes from." },
      { name: "blur", type: "string", default: '"6px"', description: "Amount of blur at the start of the animation." },
      { name: "inView", type: "boolean", default: "false", description: "Wait until the element scrolls into view before animating." },
      { name: "inViewMargin", type: "string", default: '"-50px"', description: "Margin applied to the viewport when inView is set." },
    ],
  },
  {
    slug: "grid-pattern",
    category: "backgrounds",
    title: "Grid Pattern",
    description:
      "A lightweight SVG grid background with optional highlighted cells.",
    example: "grid-pattern-demo",
    usage: `import { GridPattern } from "@/components/ui/grid-pattern"

export function Background() {
  return (
    <div className="relative h-96 overflow-hidden">
      <GridPattern squares={[[2, 3], [5, 1]]} />
    </div>
  )
}`,
    props: [
      { name: "width", type: "number", default: "40", description: "Width of a cell, in pixels." },
      { name: "height", type: "number", default: "40", description: "Height of a cell, in pixels." },
      { name: "x", type: "number", default: "-1", description: "Horizontal offset of the pattern." },
      { name: "y", type: "number", default: "-1", description: "Vertical offset of the pattern." },
      { name: "strokeDasharray", type: "string", default: '"0"', description: 'Dash pattern of the lines, e.g. "4 2".' },
      { name: "squares", type: "Array<[number, number]>", description: "Cells to fill, as [column, row] pairs." },
    ],
  },
  {
    slug: "marquee",
    category: "motion",
    title: "Marquee",
    description:
      "An infinite scrolling track for logos, testimonials or anything else.",
    example: "marquee-demo",
    usage: `import { Marquee } from "@/components/ui/marquee"

export function Logos() {
  return (
    <Marquee pauseOnHover fade>
      <span>Acme</span>
      <span>Globex</span>
      <span>Initech</span>
    </Marquee>
  )
}`,
    css: `@theme inline {
  --animate-marquee: marquee var(--duration) linear infinite;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}

@keyframes marquee-vertical {
  from { transform: translateY(0); }
  to { transform: translateY(calc(-100% - var(--gap))); }
}`,
    props: [
      { name: "reverse", type: "boolean", default: "false", description: "Reverse the scroll direction." },
      { name: "pauseOnHover", type: "boolean", default: "false", description: "Pause the animation while the pointer is over the marquee." },
      { name: "vertical", type: "boolean", default: "false", description: "Scroll vertically instead of horizontally." },
      { name: "fade", type: "boolean", default: "false", description: "Fade the edges into the background." },
      { name: "repeat", type: "number", default: "4", description: "How many times the content is repeated to fill the track." },
      { name: "duration", type: "string", default: '"40s"', description: "Duration of one full loop, as a CSS time." },
      { name: "gap", type: "string", default: '"1rem"', description: "Space between items, as a CSS length." },
    ],
  },
  {
    slug: "number-ticker",
    category: "text",
    title: "Number Ticker",
    description:
      "Counts up to a number once, when it scrolls into view. The final value is rendered on the server.",
    example: "number-ticker-demo",
    isNew: true,
    usage: `import { NumberTicker } from "@/components/ui/number-ticker"

export function Uptime() {
  return <NumberTicker value={99.99} decimals={2} suffix="%" />
}`,
    props: [
      { name: "value", type: "number", description: "The number to count up to. Required." },
      { name: "from", type: "number", default: "0", description: "Number the count starts from." },
      { name: "decimals", type: "number", default: "0", description: "Digits after the decimal point." },
      { name: "prefix", type: "string", description: 'Text before the number, such as "$" or "<".' },
      { name: "suffix", type: "string", description: 'Text after the number, such as "%" or "M+".' },
      { name: "duration", type: "number", default: "1.2", description: "Duration of the count, in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before the count starts once in view, in seconds." },
    ],
  },
  {
    slug: "section",
    category: "layout",
    title: "Section",
    description:
      "Layout primitives shared by every block: Section, Container and SectionHeader.",
    example: "section-demo",
    usage: `import { Section, SectionHeader } from "@/components/ui/section"

export function Faq() {
  return (
    <Section>
      <SectionHeader
        eyebrow="FAQ"
        title="Questions, answered."
        description="Everything you need to know before getting started."
      />
      <div className="mt-16">{/* Your content */}</div>
    </Section>
  )
}`,
    propGroups: [
      {
        title: "Section",
        props: [
          { name: "spacing", type: '"none" | "compact" | "default"', default: '"default"', description: 'Vertical padding. Use "none" when the block manages its own.' },
          { name: "width", type: '"narrow" | "default" | "wide"', default: '"default"', description: "Maximum width of the content: 3xl, 6xl or 7xl." },
          { name: "containerClassName", type: "string", description: "Classes applied to the inner container." },
        ],
      },
      {
        title: "Container",
        props: [
          { name: "width", type: '"narrow" | "default" | "wide"', default: '"default"', description: "Maximum width of the content: 3xl, 6xl or 7xl." },
        ],
      },
      {
        title: "SectionHeader",
        props: [
          { name: "title", type: "ReactNode", description: "Heading of the section. Required." },
          { name: "eyebrow", type: "ReactNode", description: "Short label above the title, set in monospace capitals." },
          { name: "description", type: "ReactNode", description: "Supporting text under the title." },
          { name: "align", type: '"center" | "left"', default: '"center"', description: "Alignment of the header." },
          { name: "as", type: '"h1" | "h2" | "h3"', default: '"h2"', description: "Heading level of the title." },
          { name: "children", type: "ReactNode", description: "Actions shown under the description, such as a toggle or buttons." },
        ],
      },
    ],
  },
  {
    slug: "segmented-control",
    category: "buttons",
    title: "Segmented Control",
    description:
      "A single choice between a few options, with a pill that slides to the selected one.",
    example: "segmented-control-demo",
    isNew: true,
    usage: `"use client"

import * as React from "react"

import { SegmentedControl } from "@/components/ui/segmented-control"

export function BillingToggle() {
  const [billing, setBilling] = React.useState("yearly")

  return (
    <SegmentedControl
      aria-label="Billing period"
      value={billing}
      onValueChange={setBilling}
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly", badge: "−20%" },
      ]}
    />
  )
}`,
    props: [
      { name: "value", type: "string", description: "The selected option. Required." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called with the option the user picks. Required." },
      { name: "options", type: "{ value: string; label: ReactNode; badge?: ReactNode }[]", description: "The options, in order. Required." },
      { name: "aria-label", type: "string", description: "Names the group for assistive technology." },
    ],
  },
  {
    slug: "shimmer-button",
    category: "buttons",
    title: "Shimmer Button",
    description: "A button with a beam of light travelling around its border.",
    example: "shimmer-button-demo",
    usage: `import { ShimmerButton } from "@/components/ui/shimmer-button"

export function Cta() {
  return <ShimmerButton>Get started</ShimmerButton>
}`,
    css: `@theme inline {
  --animate-shimmer-spin: shimmer-spin var(--shimmer-duration) linear infinite;
}

@keyframes shimmer-spin {
  to { rotate: 360deg; }
}`,
    props: [
      { name: "shimmerColor", type: "string", default: '"#ffffff"', description: "Color of the light travelling around the border." },
      { name: "shimmerDuration", type: "string", default: '"3s"', description: "Duration of one full turn, as a CSS time." },
      { name: "background", type: "string", default: '"#0a0a0a"', description: "Background of the button." },
    ],
  },
  {
    slug: "social-icons",
    category: "icons",
    title: "Social Icons",
    description:
      "Brand icons for social links: GitHub, LinkedIn, X and YouTube. lucide-react no longer ships them.",
    example: "social-icons-demo",
    isNew: true,
    usage: `import { GitHubIcon } from "@/components/ui/social-icons"

export function GitHubLink() {
  return (
    <a href="https://github.com" aria-label="GitHub">
      <GitHubIcon className="size-4" />
    </a>
  )
}`,
    propGroups: [
      {
        title: "GitHubIcon, LinkedInIcon, XIcon, YouTubeIcon",
        props: [
          { name: "...props", type: 'ComponentProps<"svg">', description: "Any SVG attribute. Size with className, colour follows currentColor." },
        ],
      },
    ],
  },
  {
    slug: "status-dot",
    category: "indicators",
    title: "Status Dot",
    description: "A small live indicator with a pulsing halo, in four tones.",
    example: "status-dot-demo",
    isNew: true,
    usage: `import { StatusDot } from "@/components/ui/status-dot"

export function Status() {
  return (
    <p className="flex items-center gap-2 text-sm">
      <StatusDot />
      All systems operational
    </p>
  )
}`,
    props: [
      { name: "tone", type: '"success" | "warning" | "danger" | "neutral"', default: '"success"', description: "Colour of the dot." },
      { name: "pulse", type: "boolean", default: "true", description: "Draw an expanding halo. It stops under reduced motion." },
      { name: "className", type: "string", description: "Size the dot with size-* utilities (size-2 by default)." },
    ],
  },
]

/** Components of each category, in category order, titles sorted. */
export function componentsByCategory() {
  return componentCategories
    .map((category) => ({
      ...category,
      components: componentDocs
        .filter((doc) => doc.category === category.slug)
        .sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .filter((category) => category.components.length > 0)
}

export function getComponentDoc(slug: string) {
  return componentDocs.find((doc) => doc.slug === slug)
}
