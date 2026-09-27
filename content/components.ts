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

export interface ComponentDoc {
  slug: string
  title: string
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
    slug: "blur-fade",
    title: "Blur Fade",
    description:
      "Reveal content with a soft blur and fade, on mount or when scrolled into view.",
    example: "blur-fade-demo",
    isNew: true,
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
    slug: "section",
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
    slug: "shimmer-button",
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
]

export function getComponentDoc(slug: string) {
  return componentDocs.find((doc) => doc.slug === slug)
}
