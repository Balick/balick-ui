import { ArrowRight, ArrowUpRight } from "lucide-react"

import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Selected work",
  title: "Projects I'm proud of.",
  description: "A few recent products, from marketing sites to full web apps.",
}

const viewAll = { label: "View all projects", href: "#" }

interface Project {
  title: string
  summary: string
  year: string
  stack: string[]
  href: string
  /** Screenshot of the project. Without one, a placeholder is drawn. */
  image?: string
}

const projects: Project[] = [
  {
    title: "Northwind",
    summary: "Marketing site and design system for a logistics platform.",
    year: "2026",
    stack: ["Next.js", "Tailwind CSS", "Motion"],
    href: "#",
  },
  {
    title: "Lumen",
    summary: "Analytics dashboard with real-time charts and team workspaces.",
    year: "2025",
    stack: ["React", "TypeScript", "D3"],
    href: "#",
  },
  {
    title: "Arcadia",
    summary: "E-commerce storefront with a headless CMS and instant search.",
    year: "2025",
    stack: ["Next.js", "Sanity", "Stripe"],
    href: "#",
  },
  {
    title: "Halcyon",
    summary: "Booking app for wellness studios, from schedule to payment.",
    year: "2024",
    stack: ["React Native", "Supabase"],
    href: "#",
  },
]

function Preview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        loading="lazy"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    )
  }
  return (
    <div
      aria-hidden
      className="flex size-full items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
    >
      <span className="text-6xl font-semibold tracking-tighter text-foreground/15">
        {project.title}
      </span>
    </div>
  )
}

export function Projects01({ id = "projects" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader {...header} align="left" />
        <a
          href={viewAll.href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium"
        >
          {viewAll.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.title}>
            <a href={project.href} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-xl border bg-muted/40">
                <Preview project={project} />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="flex items-center gap-1.5 font-medium">
                    {project.title}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
              </div>
              <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tool) => (
                  <li key={tool} className="rounded-md border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {tool}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
