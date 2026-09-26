import { BarChart3, Globe, GitBranch, Lock, Timer, Webhook } from "lucide-react"

import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Platform",
  title: "Built for the way you ship.",
  description:
    "Six building blocks that cover the whole path from commit to customer, without glue code.",
}

const features = [
  { icon: GitBranch, title: "Git-based workflow", description: "Push to deploy. Every branch gets a preview URL your whole team can review." },
  { icon: Globe, title: "Global edge network", description: "Served from 312 locations, a few milliseconds away from every visitor." },
  { icon: BarChart3, title: "Real-time analytics", description: "Traffic, performance and conversions, live and without sampling." },
  { icon: Lock, title: "Secure by default", description: "Encryption, SSO and audit logs included on every plan, not sold as add-ons." },
  { icon: Timer, title: "Instant rollbacks", description: "Revert any deploy in one click. No rebuild, no waiting, no downtime." },
  { icon: Webhook, title: "Integrations", description: "Connect your database, payments and email, or build your own with webhooks." },
]

export function Features02() {
  return (
    <Section>
      <SectionHeader {...header} align="left" />
      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-background p-8 transition-colors hover:bg-muted/30">
            <span className="flex size-10 items-center justify-center rounded-lg border">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <h3 className="mt-6 font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
