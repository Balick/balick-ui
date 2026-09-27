import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "About",
  title: "Design-minded engineer.",
}

const paragraphs = [
  "I'm a frontend developer who cares about the details users feel but rarely notice: timing, spacing, and interfaces that respond instantly.",
  "For the past six years I've helped startups and studios turn ideas into products, from the first prototype to the design system that keeps them consistent as they grow.",
]

const stats = [
  { value: "6+", label: "Years of experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "25", label: "Happy clients" },
]

const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design systems", "Accessibility", "Motion", "Performance"]

export function About01() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <SectionHeader {...header} align="left" />
        <div>
          <div className="flex flex-col gap-5 text-lg leading-8 text-muted-foreground">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-3 divide-x border-y">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-4 py-6 first:pl-0">
                <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <ul aria-label="Skills" className="mt-8 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill} className="rounded-full border px-3 py-1 text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
