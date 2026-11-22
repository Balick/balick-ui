import { installTarget, siteConfig } from "@/config/site"
import { getBlock } from "@/content/blocks"

/**
 * Templates are complete pages: an ordered list of blocks, installed with one
 * command as app/page.tsx plus every block it uses. A template that uses a
 * Pro block is a Pro template; the others are free.
 *
 * Templates whose blocks are not available (the Pro sources are missing from
 * a build) are left out, so every listed template can be previewed.
 */
export interface TemplateDefinition {
  slug: string
  title: string
  /** One line, shown on the cards. */
  description: string
  /** Who it is for, shown on the template page. */
  audience: string
  /** What the page covers, in order. */
  highlights: string[]
  blocks: string[]
}

const definitions: TemplateDefinition[] = [
  {
    slug: "launch",
    title: "Launch",
    description: "A SaaS landing page with light rays, live product tabs and usage-based pricing.",
    audience: "SaaS products and startups preparing a launch.",
    highlights: [
      "Hero with light rays, rotating words and an inline sign-up",
      "Product tour in auto-advancing tabs",
      "Spotlight feature cards and a live metrics bento",
      "Pricing with a usage slider, FAQ with search",
    ],
    blocks: [
      "navbar-02",
      "hero-04",
      "logos-02",
      "features-03",
      "features-04",
      "stats-02",
      "testimonials-02",
      "pricing-04",
      "faq-02",
      "cta-02",
      "footer-03",
    ],
  },
  {
    slug: "ai-product",
    title: "AI Product",
    description: "An AI assistant landing page with a live chat demo, integrations in orbit and seat pricing.",
    audience: "AI assistants, copilots and developer-facing AI tools.",
    highlights: [
      "Hero with a chat that types its answer, with citations",
      "Features as alternating rows with small product screens",
      "Integrations orbiting the product",
      "Per-seat pricing with a seat counter",
    ],
    blocks: [
      "navbar-02",
      "hero-06",
      "logos-02",
      "features-05",
      "integrations-02",
      "testimonials-03",
      "pricing-05",
      "faq-02",
      "cta-03",
      "footer-03",
    ],
  },
  {
    slug: "fintech",
    title: "Fintech",
    description: "A finance product page with a dashboard that straightens on scroll and a sticky step-by-step tour.",
    audience: "Fintech, banking and analytics products.",
    highlights: [
      "Hero with a perspective dashboard that settles as you scroll",
      "Mega-menu navigation",
      "Sticky scroll steps and a live metrics bento",
      "Pricing with a usage slider",
    ],
    blocks: [
      "navbar-03",
      "hero-05",
      "logos-02",
      "stats-02",
      "features-03",
      "steps-02",
      "testimonials-02",
      "pricing-04",
      "faq-02",
      "cta-02",
      "footer-03",
    ],
  },
  {
    slug: "waitlist",
    title: "Waitlist",
    description: "A pre-launch page with a countdown, a retro grid and a waitlist form.",
    audience: "Products before launch, collecting early sign-ups.",
    highlights: [
      "Countdown hero with a waitlist form",
      "Spotlight feature cards",
      "Featured testimonials",
      "Newsletter with stacked issues",
    ],
    blocks: ["hero-07", "features-04", "testimonials-03", "newsletter-02", "faq-02", "footer-02"],
  },
  {
    slug: "company",
    title: "Company",
    description: "An about page with the mission revealed word by word, the team, a changelog and offices.",
    audience: "The about, team and careers pages of a growing company.",
    highlights: [
      "Mission revealed word by word, stats and milestones",
      "Team cards with revealed bios and a hiring card",
      "Changelog filtered by kind of change",
      "Offices with their live local time",
    ],
    blocks: ["navbar-02", "about-02", "team-02", "timeline-02", "blog-02", "contact-03", "footer-03"],
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "A product updates page: a filterable changelog, the blog and a newsletter with stacked issues.",
    audience: "Product teams that ship often and want people to notice.",
    highlights: [
      "Changelog with sticky dates and a filter by kind of change",
      "Blog index with a featured post and categories",
      "Newsletter sign-up beside the latest issues",
      "Complete footer with a call to action",
    ],
    blocks: ["navbar-02", "timeline-02", "blog-02", "newsletter-02", "footer-03"],
  },
  {
    slug: "saas",
    title: "SaaS",
    description: "The classic product landing page: hero, bento features, integrations, pricing and FAQ.",
    audience: "Any product that needs a clear, complete landing page.",
    highlights: [
      "Hero with a product preview and a logo cloud",
      "Bento grid of illustrated features",
      "Three-tier pricing with a yearly toggle",
      "FAQ, call to action and a full footer",
    ],
    blocks: [
      "navbar-01",
      "hero-01",
      "features-01",
      "integrations-01",
      "testimonials-01",
      "pricing-01",
      "faq-01",
      "cta-01",
      "footer-01",
    ],
  },
  {
    slug: "developer-tool",
    title: "Developer Tool",
    description: "A page for a developer product: deploy terminal, key figures, steps and plan comparison.",
    audience: "APIs, SDKs, CLIs and infrastructure products.",
    highlights: [
      "Hero with key figures and an animated deploy terminal",
      "Features in a hairline grid",
      "Four steps to get started",
      "Plan comparison table",
    ],
    blocks: [
      "navbar-01",
      "hero-02",
      "logos-01",
      "features-02",
      "steps-01",
      "stats-01",
      "pricing-03",
      "faq-01",
      "footer-01",
    ],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "A personal site: introduction, projects, services and a way to get in touch.",
    audience: "Freelancers, designers and developers.",
    highlights: [
      "Personal hero with availability and tools",
      "About section with figures and skills",
      "Project grid and priced services",
      "Contact panel with a copyable email",
    ],
    blocks: ["navbar-01", "hero-03", "about-01", "projects-01", "services-01", "testimonials-01", "contact-01", "footer-02"],
  },

]

export type Template = TemplateDefinition & {
  tier: "free" | "pro"
  /** What to pass to `shadcn add`. */
  target: string
}

function resolve(definition: TemplateDefinition): Template | null {
  const blocks = definition.blocks.map((name) => getBlock(name))
  if (blocks.some((block) => !block)) return null
  return {
    ...definition,
    tier: blocks.some((block) => block!.tier === "pro") ? "pro" : "free",
    target: installTarget(`templates/${definition.slug}`),
  }
}

/** Every available template, Pro first. */
export const templates: Template[] = definitions
  .map(resolve)
  .filter((template): template is Template => template !== null)

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug)
}

export const templateHref = (slug: string) => `/templates/${slug}`

/** The live preview of a template, rendered by /view/compose. */
export const templatePreviewHref = (template: Pick<Template, "blocks">) =>
  `/view/compose?blocks=${template.blocks.join(",")}`

/** The composer, opened on the blocks of a template. */
export const templateComposeHref = (template: Pick<Template, "blocks">) =>
  `/compose?blocks=${template.blocks.join(",")}`

/** Screenshot of a template on the gallery cards (see scripts/template-screenshots.mjs). */
export const templateImage = (slug: string, scheme: "light" | "dark") => `/templates/${slug}-${scheme}.jpg`

export const templateRegistryUrl = (slug: string) => `${siteConfig.url}/r/templates/${slug}.json`
