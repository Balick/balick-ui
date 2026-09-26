import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Testimonials",
  title: "Loved by teams who ship.",
  description: "Thousands of teams rely on Acme to build, launch and grow their products.",
}

const testimonials = [
  {
    quote:
      "We moved our whole stack over in a weekend. Deploys went from twenty minutes to under one, and nobody on the team has looked back since.",
    name: "Lina Moreau",
    role: "CTO, Northwind",
  },
  {
    quote: "The first tool in years that made our engineers faster without adding process.",
    name: "Marc Dubois",
    role: "Engineering Manager, Lumen",
  },
  {
    quote:
      "Preview environments changed how we review work. Designers and PMs see every change before it ships, so feedback arrives on day one instead of after launch.",
    name: "Sofia Alvarez",
    role: "Head of Product, Arcadia",
  },
  {
    quote: "Support answers in minutes, and actually knows the product.",
    name: "Noah Kim",
    role: "Founder, Halcyon",
  },
  {
    quote:
      "Analytics that are accurate by default. We finally stopped arguing about which dashboard is right.",
    name: "Yara Haddad",
    role: "Data Lead, Quanta",
  },
  {
    quote:
      "Rollbacks are one click. That alone paid for the subscription the first time we needed it.",
    name: "Tom Becker",
    role: "Staff Engineer, Stratum",
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

export function Testimonials01() {
  return (
    <Section>
      <SectionHeader {...header} />
      <div className="mt-16 columns-1 gap-4 md:columns-2 lg:columns-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="mb-4 break-inside-avoid rounded-xl border bg-background p-6"
          >
            <blockquote className="text-sm leading-6">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background"
              >
                {initials(testimonial.name)}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium">{testimonial.name}</span>
                <span className="text-xs text-muted-foreground">{testimonial.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
