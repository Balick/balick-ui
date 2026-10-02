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

/** Categories in display order, used by the sidebar, the category tabs and the overview. */
export const componentCategories: {
  slug: ComponentCategory
  title: string
  description: string
  /** Component whose demo stands for the category on the overview. */
  featured: string
}[] = [
  { slug: "buttons", title: "Buttons", description: "Buttons and controls with quiet, deliberate feedback.", featured: "shimmer-button" },
  { slug: "text", title: "Text & numbers", description: "Words and figures that change without shouting.", featured: "number-ticker" },
  { slug: "motion", title: "Motion", description: "Reveals and loops that support the content.", featured: "marquee" },
  { slug: "backgrounds", title: "Backgrounds", description: "Patterns that sit behind a section.", featured: "grid-pattern" },
  { slug: "indicators", title: "Indicators", description: "Small signals of state.", featured: "status-dot" },
  { slug: "icons", title: "Icons", description: "Icons lucide-react does not ship.", featured: "social-icons" },
  { slug: "layout", title: "Layout", description: "The primitives every block is built on.", featured: "section" },
]

/**
 * Longest description of a component, in characters: past it, the text of a
 * card in the gallery runs onto a third line and the cards stop lining up.
 */
export const maxDescriptionLength = 80

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
      "A number that rolls up or down to its new value, such as a price or a total.",
    example: "animated-number-demo",
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
      "Counts up to a number once, when it scrolls into view.",
    example: "number-ticker-demo",
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
      "A single choice between a few options, with a pill that slides to the pick.",
    example: "segmented-control-demo",
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
      "Brand icons lucide-react no longer ships: GitHub, LinkedIn, X and YouTube.",
    example: "social-icons-demo",
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
  {
    slug: "arrow-button",
    category: "buttons",
    title: "Arrow Button",
    description: "A button or link whose arrow nudges forward on hover and focus.",
    example: "arrow-button-demo",
    usage: `import { ArrowButton, ArrowLink } from "@/components/ui/arrow-button"

export function Actions() {
  return (
    <>
      <ArrowButton>Get started</ArrowButton>
      <ArrowLink href="/docs" variant="outline">Read the docs</ArrowLink>
    </>
  )
}`,
    propGroups: [
      {
        title: "ArrowButton",
        props: [
          { name: "...props", type: "ComponentProps<typeof Button>", description: "Every prop of the shadcn/ui Button, including variant and size." },
        ],
      },
      {
        title: "ArrowLink",
        props: [
          { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "link"', default: '"default"', description: "Button style applied to the link." },
          { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Button size applied to the link." },
          { name: "...props", type: 'ComponentProps<"a">', description: "Any anchor attribute, such as href." },
        ],
      },
    ],
  },
  {
    slug: "copy-button",
    category: "buttons",
    title: "Copy Button",
    description: "Copies a text to the clipboard; the icon turns into a check mark.",
    example: "copy-button-demo",
    usage: `import { CopyButton } from "@/components/ui/copy-button"

export function Command() {
  return <CopyButton value="npm install motion" label="Copy command" />
}`,
    props: [
      { name: "value", type: "string", description: "Text written to the clipboard. Required." },
      { name: "label", type: "string", default: '"Copy"', description: "Accessible name of the button." },
      { name: "timeout", type: "number", default: "2000", description: "How long the check mark stays, in milliseconds." },
      { name: "onCopy", type: "() => void", description: "Called once the text is copied." },
    ],
  },
  {
    slug: "expand-button",
    category: "buttons",
    title: "Expand Button",
    description: "An icon button whose label slides out on hover and keyboard focus.",
    example: "expand-button-demo",
    usage: `import { Star } from "lucide-react"

import { ExpandButton } from "@/components/ui/expand-button"

export function StarButton() {
  return <ExpandButton icon={<Star />} label="Star on GitHub" />
}`,
    props: [
      { name: "icon", type: "ReactNode", description: "Icon shown on its own at rest. Required." },
      { name: "label", type: "string", description: "Label that unfolds on hover and focus. Always the accessible name. Required." },
      { name: "variant", type: "Button variant", default: '"outline"', description: "Style of the shadcn/ui Button underneath." },
    ],
  },
  {
    slug: "hold-button",
    category: "buttons",
    title: "Hold Button",
    description: "Hold to confirm, for actions that are hard to undo. Releasing early cancels.",
    example: "hold-button-demo",
    usage: `import { HoldButton } from "@/components/ui/hold-button"

export function DeleteProject() {
  return <HoldButton onConfirm={() => deleteProject()}>Hold to delete</HoldButton>
}`,
    props: [
      { name: "onConfirm", type: "() => void", description: "Called once the button has been held long enough. Required." },
      { name: "duration", type: "number", default: "1200", description: "How long to hold, in milliseconds." },
      { name: "variant", type: "Button variant", default: '"destructive"', description: "Style of the shadcn/ui Button underneath." },
    ],
  },
  {
    slug: "magnetic-button",
    category: "buttons",
    title: "Magnetic Button",
    description: "A button that leans toward the pointer and settles back when it leaves.",
    example: "magnetic-button-demo",
    usage: `import { MagneticButton } from "@/components/ui/magnetic-button"

export function Cta() {
  return <MagneticButton size="lg">Hover me</MagneticButton>
}`,
    props: [
      { name: "strength", type: "number", default: "0.3", description: "Share of the pointer's distance the button follows, from 0 to 1." },
      { name: "max", type: "number", default: "8", description: "Largest shift, in pixels." },
    ],
  },
  {
    slug: "ripple-button",
    category: "buttons",
    title: "Ripple Button",
    description: "A button that sends a soft ripple out from where it is pressed.",
    example: "ripple-button-demo",
    usage: `import { RippleButton } from "@/components/ui/ripple-button"

export function Submit() {
  return <RippleButton type="submit">Submit</RippleButton>
}`,
    props: [
      { name: "...props", type: "ComponentProps<typeof Button>", description: "Every prop of the shadcn/ui Button. The ripple takes the colour of the text." },
    ],
  },
  {
    slug: "spotlight-button",
    category: "buttons",
    title: "Spotlight Button",
    description: "A soft light follows the pointer inside the button, in the colour of its text.",
    example: "spotlight-button-demo",
    usage: `import { SpotlightButton } from "@/components/ui/spotlight-button"

export function Cta() {
  return <SpotlightButton size="lg">Start building</SpotlightButton>
}`,
    props: [
      { name: "...props", type: "ComponentProps<typeof Button>", description: "Every prop of the shadcn/ui Button." },
    ],
  },
  {
    slug: "status-button",
    category: "buttons",
    title: "Status Button",
    description: "A button that shows the progress of its action: idle, loading, success or error.",
    example: "status-button-demo",
    usage: `"use client"

import * as React from "react"

import { StatusButton, type ButtonStatus } from "@/components/ui/status-button"

export function SaveButton() {
  const [status, setStatus] = React.useState<ButtonStatus>("idle")

  async function save() {
    setStatus("loading")
    try {
      await saveChanges()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <StatusButton status={status} onClick={save}>
      Save changes
    </StatusButton>
  )
}`,
    props: [
      { name: "status", type: '"idle" | "loading" | "success" | "error"', default: '"idle"', description: "Current state. The button is disabled while loading." },
      { name: "loadingText", type: "ReactNode", default: '"Saving"', description: "Label while loading." },
      { name: "successText", type: "ReactNode", default: '"Saved"', description: "Label after a success." },
      { name: "errorText", type: "ReactNode", default: '"Try again"', description: "Label after an error." },
    ],
  },
  {
    slug: "text-roll-button",
    category: "buttons",
    title: "Text Roll Button",
    description: "On hover and focus, the label rolls up and an identical copy takes its place.",
    example: "text-roll-button-demo",
    usage: `import { TextRollButton } from "@/components/ui/text-roll-button"

export function Demo() {
  return <TextRollButton>Book a demo</TextRollButton>
}`,
    props: [
      { name: "children", type: "ReactNode", description: "The label. Keep it to plain text." },
      { name: "...props", type: "ComponentProps<typeof Button>", description: "Every prop of the shadcn/ui Button." },
    ],
  },
  {
    slug: "theme-toggle-button",
    category: "buttons",
    title: "Theme Toggle Button",
    description: "Switches between light and dark with next-themes; the sun grows into a moon.",
    example: "theme-toggle-button-demo",
    usage: `import { ThemeToggleButton } from "@/components/ui/theme-toggle-button"

export function Header() {
  return <ThemeToggleButton />
}`,
    props: [
      { name: "variant", type: "Button variant", default: '"ghost"', description: "Style of the shadcn/ui Button underneath." },
      { name: "size", type: "Button size", default: '"icon"', description: "Size of the button." },
    ],
  },
  {
    slug: "word-rotate",
    category: "text",
    title: "Word Rotate",
    description: "Cycles through words in place, each one sliding up into view.",
    example: "word-rotate-demo",
    usage: `import { WordRotate } from "@/components/ui/word-rotate"

export function Headline() {
  return (
    <h1>
      Ship pages <WordRotate words={["faster", "calmer", "together"]} />
    </h1>
  )
}`,
    props: [
      { name: "words", type: "string[]", description: "Words shown in turn, starting with the first. Required." },
      { name: "interval", type: "number", default: "2500", description: "Time each word stays, in milliseconds." },
    ],
  },
  {
    slug: "text-reveal",
    category: "text",
    title: "Text Reveal",
    description: "Reveals a line word by word, each part fading in from a light blur.",
    example: "text-reveal-demo",
    usage: `import { TextReveal } from "@/components/ui/text-reveal"

export function Hero() {
  return <TextReveal as="h1">Blocks designed to fit together.</TextReveal>
}`,
    props: [
      { name: "children", type: "string", description: "The text to reveal. Required." },
      { name: "as", type: '"h1" | "h2" | "h3" | "p" | "span"', default: '"p"', description: "Element rendered around the text." },
      { name: "by", type: '"word" | "character"', default: '"word"', description: "Reveal word by word, or character by character." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first part, in seconds." },
      { name: "stagger", type: "number", default: "0.06", description: "Delay between two parts, in seconds." },
      { name: "inView", type: "boolean", default: "false", description: "Wait until the text scrolls into view." },
    ],
  },
  {
    slug: "typewriter",
    category: "text",
    title: "Typewriter",
    description: "Types phrases character by character, erases them and types the next.",
    example: "typewriter-demo",
    usage: `import { Typewriter } from "@/components/ui/typewriter"

export function Prompt() {
  return <Typewriter text={["Build a landing page", "Add a pricing table"]} />
}`,
    props: [
      { name: "text", type: "string | string[]", description: "A phrase, or phrases typed one after the other. Required." },
      { name: "speed", type: "number", default: "45", description: "Time to type one character, in milliseconds." },
      { name: "deleteSpeed", type: "number", default: "25", description: "Time to erase one character, in milliseconds." },
      { name: "pause", type: "number", default: "1800", description: "Time a finished phrase stays before it is erased, in milliseconds." },
      { name: "loop", type: "boolean", default: "true", description: "Start over after the last phrase." },
      { name: "caret", type: "boolean", default: "true", description: "Show a blinking caret." },
    ],
  },
  {
    slug: "scramble-text",
    category: "text",
    title: "Scramble Text",
    description: "Letters start scrambled and settle from left to right, without reflow.",
    example: "scramble-text-demo",
    usage: `import { ScrambleText } from "@/components/ui/scramble-text"

export function Status() {
  return <ScrambleText text="SYSTEMS NOMINAL" scrambleOnHover className="font-mono" />
}`,
    props: [
      { name: "text", type: "string", description: "The text to decode. Required." },
      { name: "trigger", type: '"mount" | "inView"', default: '"inView"', description: "When the text decodes: on load, or once it scrolls into view." },
      { name: "scrambleOnHover", type: "boolean", default: "false", description: "Decode again each time the pointer enters the text." },
      { name: "duration", type: "number", default: "800", description: "Duration of the decoding, in milliseconds." },
      { name: "characters", type: "string", default: '"A–Z 0–9"', description: "Characters drawn while the text is scrambled." },
    ],
  },
  {
    slug: "shimmer-text",
    category: "text",
    title: "Shimmer Text",
    description: "A light sweeps across the text, for work in progress such as “Generating…”.",
    example: "shimmer-text-demo",
    usage: `import { ShimmerText } from "@/components/ui/shimmer-text"

export function Pending() {
  return <ShimmerText>Generating your page…</ShimmerText>
}`,
    props: [
      { name: "duration", type: "number", default: "2", description: "Duration of one sweep, in seconds." },
    ],
  },
  {
    slug: "highlight-text",
    category: "text",
    title: "Highlight Text",
    description: "A marker stroke draws behind words as they scroll into view.",
    example: "highlight-text-demo",
    usage: `import { HighlightText } from "@/components/ui/highlight-text"

export function Pitch() {
  return (
    <p>
      Every block shares the same primitives, so{" "}
      <HighlightText>any combination looks like one page</HighlightText>.
    </p>
  )
}`,
    props: [
      { name: "color", type: "string", default: "text colour at 14%", description: "Colour of the highlight, as any CSS colour." },
      { name: "duration", type: "number", default: "0.8", description: "Duration of the stroke, in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay once in view, in seconds." },
    ],
  },
  {
    slug: "underline-link",
    category: "text",
    title: "Underline Link",
    description: "A link whose underline draws in on hover and focus, and leaves to the right.",
    example: "underline-link-demo",
    usage: `import Link from "next/link"

import { UnderlineLink, underlineLinkClassName } from "@/components/ui/underline-link"

export function Links() {
  return (
    <>
      <UnderlineLink href="https://github.com">GitHub</UnderlineLink>
      <Link href="/changelog" className={underlineLinkClassName}>Changelog</Link>
    </>
  )
}`,
    propGroups: [
      {
        title: "UnderlineLink",
        props: [
          { name: "...props", type: 'ComponentProps<"a">', description: "Any anchor attribute, such as href." },
        ],
      },
      {
        title: "underlineLinkClassName",
        props: [
          { name: "string", type: "string", description: "The classes that draw the underline, for your router's link component." },
        ],
      },
    ],
  },
  {
    slug: "expandable-text",
    category: "text",
    title: "Expandable Text",
    description: "Long text clamped to a few lines, with a button that unfolds the rest.",
    example: "expandable-text-demo",
    usage: `import { ExpandableText } from "@/components/ui/expandable-text"

export function Review({ text }: { text: string }) {
  return <ExpandableText lines={4}>{text}</ExpandableText>
}`,
    props: [
      { name: "lines", type: "number", default: "3", description: "Lines shown while collapsed." },
      { name: "moreLabel", type: "string", default: '"Show more"', description: "Label of the button while collapsed." },
      { name: "lessLabel", type: "string", default: '"Show less"', description: "Label of the button while expanded." },
    ],
  },
  {
    slug: "countdown",
    category: "text",
    title: "Countdown",
    description: "Days, hours, minutes and seconds left until a date, each rolling to its value.",
    example: "countdown-demo",
    usage: `import { Countdown } from "@/components/ui/countdown"

export function Launch() {
  return <Countdown to="2026-12-01T09:00:00Z" onComplete={() => location.reload()} />
}`,
    props: [
      { name: "to", type: "Date | string | number", description: "The moment the countdown reaches zero. Required." },
      { name: "onComplete", type: "() => void", description: "Called once, when the countdown reaches zero." },
      { name: "labels", type: "{ days, hours, minutes, seconds }", description: "Labels under each unit, e.g. for another language." },
      { name: "className", type: "string", description: "Size the numbers with a text size on the root (text-4xl by default)." },
    ],
  },
  {
    slug: "stagger",
    category: "motion",
    title: "Stagger",
    description: "Brings the children of a list or a grid in one after the other.",
    example: "stagger-demo",
    usage: `import { Stagger } from "@/components/ui/stagger"

export function Team({ people }: { people: string[] }) {
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2" interval={0.1} inView>
      {people.map((person) => (
        <div key={person} className="rounded-lg border p-4">
          {person}
        </div>
      ))}
    </Stagger>
  )
}`,
    props: [
      { name: "interval", type: "number", default: "0.08", description: "Delay between two children, in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first child, in seconds." },
      { name: "duration", type: "number", default: "0.45", description: "Duration of each child's entrance, in seconds." },
      { name: "offset", type: "number", default: "12", description: "Distance travelled by each child, in pixels." },
      { name: "direction", type: "\"up\" | \"down\" | \"left\" | \"right\"", default: "\"up\"", description: "Direction the children come from." },
      { name: "inView", type: "boolean", default: "false", description: "Wait until the group scrolls into view before animating." },
      { name: "inViewMargin", type: "string", default: "\"-50px\"", description: "Margin applied to the viewport when inView is set." },
      { name: "itemClassName", type: "string", description: "Class name of the wrapper around each child. Every direct child is wrapped in a div." },
    ],
  },
  {
    slug: "mask-reveal",
    category: "motion",
    title: "Mask Reveal",
    description: "Uncovers an image or a card with a mask that slides across it.",
    example: "mask-reveal-demo",
    usage: `import { MaskReveal } from "@/components/ui/mask-reveal"

export function Cover() {
  return (
    <MaskReveal direction="left" zoom inView className="rounded-xl">
      <img src="/cover.jpg" alt="" className="aspect-video w-full object-cover" />
    </MaskReveal>
  )
}`,
    props: [
      { name: "direction", type: "\"left\" | \"right\" | \"up\" | \"down\"", default: "\"left\"", description: "Side the reveal starts from." },
      { name: "duration", type: "number", default: "0.9", description: "Duration of the reveal, in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before the reveal, in seconds." },
      { name: "zoom", type: "boolean", default: "false", description: "Let the content settle from a slight zoom while it is revealed." },
      { name: "inView", type: "boolean", default: "false", description: "Wait until the element scrolls into view before revealing." },
      { name: "inViewMargin", type: "string", default: "\"-50px\"", description: "Margin applied to the viewport when inView is set." },
    ],
  },
  {
    slug: "orbit",
    category: "motion",
    title: "Orbit",
    description: "Items that circle a center while staying upright. Nest one for a second ring.",
    example: "orbit-demo",
    usage: `import { Orbit } from "@/components/ui/orbit"

export function Integrations() {
  return (
    <Orbit size="14rem" center={<Logo />}>
      <Chip>Mail</Chip>
      <Chip>Calendar</Chip>
      <Chip>Drive</Chip>
    </Orbit>
  )
}`,
    css: `@theme inline {
  --animate-orbit-spin: orbit-spin var(--orbit-duration) linear infinite;
}

@keyframes orbit-spin {
  to { rotate: 360deg; }
}`,
    props: [
      { name: "center", type: "React.ReactNode", description: "What sits in the middle. It can be another Orbit." },
      { name: "size", type: "string", default: "\"16rem\"", description: "Diameter of the ring, as a CSS length." },
      { name: "duration", type: "string", default: "\"30s\"", description: "Duration of one turn, as a CSS time." },
      { name: "reverse", type: "boolean", default: "false", description: "Turn counter-clockwise." },
      { name: "ring", type: "boolean", default: "true", description: "Draw the ring." },
    ],
  },
  {
    slug: "tilt-card",
    category: "motion",
    title: "Tilt Card",
    description: "A card that leans toward the mouse in 3D, with a soft glare.",
    example: "tilt-card-demo",
    usage: `import { TiltCard } from "@/components/ui/tilt-card"

export function Membership() {
  return (
    <TiltCard className="w-64 rounded-2xl border bg-card p-5">
      <p className="font-medium">Membership</p>
    </TiltCard>
  )
}`,
    props: [
      { name: "maxTilt", type: "number", default: "10", description: "Largest angle the card leans, in degrees." },
      { name: "glare", type: "boolean", default: "true", description: "Light a soft spot under the pointer." },
      { name: "scale", type: "number", default: "1.02", description: "Scale of the card while the pointer is over it." },
    ],
  },
  {
    slug: "parallax",
    category: "motion",
    title: "Parallax",
    description: "A layer that moves at its own pace while the page scrolls, to suggest depth.",
    example: "parallax-demo",
    usage: `import { Parallax } from "@/components/ui/parallax"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Parallax distance={80} className="absolute -top-10 right-10 size-40 rounded-full bg-muted" />
      <h1 className="relative">Depth</h1>
    </section>
  )
}`,
    props: [
      { name: "distance", type: "number", default: "60", description: "How far the layer drifts, in pixels, while it crosses the screen. A negative value reverses it." },
      { name: "scrollRef", type: "React.RefObject<HTMLElement | null>", description: "The element that scrolls, which must be positioned (relative). It is the page by default." },
    ],
  },
  {
    slug: "scroll-progress",
    category: "motion",
    title: "Scroll Progress",
    description: "A bar that fills as you scroll the page or a panel.",
    example: "scroll-progress-demo",
    usage: `import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  )
}`,
    props: [
      { name: "scrollRef", type: "React.RefObject<HTMLElement | null>", description: "The element that scrolls. It is the page by default." },
      { name: "className", type: "string", description: "Replaces the default placement and color (fixed to the top, 2px high, foreground color)." },
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

export function getComponentCategory(slug: string) {
  return componentsByCategory().find((category) => category.slug === slug)
}

/** Gallery of a category: /components/buttons. */
export function categoryHref(category: ComponentCategory) {
  return `/components/${category}`
}

/** Docs page of a component: /components/buttons/arrow-button. */
export function componentHref(slug: string) {
  const doc = getComponentDoc(slug)
  if (!doc) throw new Error(`Unknown component: ${slug}`)
  return `${categoryHref(doc.category)}/${doc.slug}`
}
