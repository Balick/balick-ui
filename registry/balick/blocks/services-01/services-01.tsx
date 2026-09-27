import { ArrowUpRight } from "lucide-react"

import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Services",
  title: "What I can do for you.",
  description:
    "Focused engagements with a clear scope, a fixed price and a date you can plan around.",
}

const services = [
  {
    title: "Product design",
    description:
      "Research, flows and high-fidelity interfaces, tested with real users before a line of code is written.",
    deliverables: ["User research", "Wireframes", "Prototypes"],
    price: "From $4,000",
    href: "#",
  },
  {
    title: "Web development",
    description:
      "Fast, accessible sites and web apps built with React and Next.js, ready to grow with your product.",
    deliverables: ["Next.js", "CMS", "Performance"],
    price: "From $6,000",
    href: "#",
  },
  {
    title: "Design systems",
    description:
      "Tokens, components and documentation that keep every screen consistent as your team scales.",
    deliverables: ["Tokens", "Component library", "Docs"],
    price: "From $8,000",
    href: "#",
  },
  {
    title: "Audits and consulting",
    description:
      "A clear report on accessibility, performance and UX, with a prioritised plan your team can act on.",
    deliverables: ["Accessibility", "Core Web Vitals", "UX review"],
    price: "From $1,500",
    href: "#",
  },
]

export function Services01({ id = "services" }: { id?: string }) {
  return (
    <Section id={id}>
      <SectionHeader {...header} align="left" />
      <ul className="mt-16 divide-y border-y">
        {services.map((service, index) => (
          <li key={service.title}>
            <a
              href={service.href}
              className="group grid grid-cols-1 gap-4 py-8 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:gap-6 lg:grid-cols-[3rem_1fr_1.5fr_auto] lg:gap-10"
            >
              <span className="font-mono text-xs text-muted-foreground sm:pt-1.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.price}</p>
              </div>
              <div className="sm:col-start-2 lg:col-start-auto">
                <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
                <ul aria-label="Deliverables" className="mt-4 flex flex-wrap gap-2">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="rounded-full border px-3 py-1 text-xs">
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="hidden size-10 items-center justify-center rounded-full border transition-colors group-hover:bg-foreground group-hover:text-background sm:col-start-3 sm:row-start-1 sm:flex lg:col-start-4">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
