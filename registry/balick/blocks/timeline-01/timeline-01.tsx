import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Our story",
  title: "Five years of shipping.",
  description: "From a side project to the platform thousands of teams deploy with every day.",
}

const milestones = [
  {
    date: "2021",
    title: "The first commit",
    description: "Two engineers tired of slow deploys build the tool they wish they had.",
  },
  {
    date: "2022",
    title: "Public launch",
    description: "Ten thousand developers sign up in the first month. Preview deployments ship.",
  },
  {
    date: "2023",
    title: "Seed round and first hires",
    description: "We raise $4M and grow to a team of twelve across three time zones.",
  },
  {
    date: "2024",
    title: "Global edge network",
    description: "Sites are now served from over 300 locations, a few milliseconds from every visitor.",
  },
  {
    date: "2026",
    title: "One million deploys a day",
    description: "Teams of every size, from solo founders to public companies, ship with Acme.",
  },
]

export function Timeline01({ id = "timeline" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader {...header} align="left" />
        </div>
        <ol className="relative border-l">
          {milestones.map((milestone, index) => (
            <li key={milestone.title} className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden
                className={
                  index === milestones.length - 1
                    ? "absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-foreground ring-4 ring-background"
                    : "absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-muted-foreground/40 ring-4 ring-background"
                }
              />
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                <time dateTime={milestone.date}>{milestone.date}</time>
              </p>
              <h3 className="mt-2 text-lg font-medium">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
