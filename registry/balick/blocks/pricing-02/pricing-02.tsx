import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Pricing",
  title: "One plan. Everything included.",
  description: "No tiers to compare and no add-ons to chase. Just the full product.",
}

const plan = {
  name: "Acme Pro",
  description: "Everything your team needs to build, ship and grow, with room to scale.",
  price: 29,
  period: "per user / month",
  cta: { label: "Start your free trial", href: "#" },
  note: "14-day free trial · No credit card required",
  contact: { label: "Need more than 50 seats? Talk to sales", href: "#" },
  features: [
    "Unlimited projects",
    "Preview deployments",
    "1M monthly events",
    "Global edge network",
    "SSO and audit logs",
    "Instant rollbacks",
    "Priority support",
    "99.99% uptime SLA",
  ],
}

export function Pricing02() {
  return (
    <Section>
      <SectionHeader {...header} />
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border lg:grid-cols-[1.4fr_1fr]">
        <div className="p-8 sm:p-10">
          <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <p className="text-sm font-medium whitespace-nowrap">What&apos;s included</p>
            <span className="h-px flex-1 bg-border" />
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center border-t bg-muted/40 p-8 text-center sm:p-10 lg:border-t-0 lg:border-l">
          <p className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tighter">${plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </p>
          <Button size="lg" className="mt-8 w-full" asChild>
            <a href={plan.cta.href}>{plan.cta.label}</a>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">{plan.note}</p>
          <a
            href={plan.contact.href}
            className="mt-8 text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            {plan.contact.label}
          </a>
        </div>
      </div>
    </Section>
  )
}
