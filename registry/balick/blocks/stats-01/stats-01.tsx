import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "By the numbers",
  title: "Trusted at every scale.",
  description:
    "From weekend projects to global launches, Acme keeps up with the teams who rely on it.",
}

const stats = [
  { value: "99.99%", label: "Uptime", description: "Measured over the last twelve months." },
  { value: "312", label: "Edge locations", description: "A few milliseconds from every visitor." },
  { value: "40M+", label: "Deploys a month", description: "From teams of one to ten thousand." },
  { value: "<1 min", label: "Average build", description: "Cached, incremental and parallel." },
]

export function Stats01({ id = "stats" }: { id?: string }) {
  return (
    <Section id={id}>
      <SectionHeader {...header} align="left" />
      <div className="mt-16 overflow-hidden rounded-2xl border bg-card">
        <dl className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col border-r border-b p-8">
              <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {stat.label}
              </dt>
              <dd className="order-first mb-6 text-4xl font-semibold tracking-tighter tabular-nums sm:text-5xl">
                {stat.value}
              </dd>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{stat.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
