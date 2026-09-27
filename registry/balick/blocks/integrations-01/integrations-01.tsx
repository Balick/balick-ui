import {
  ArrowRight,
  BarChart3,
  Bell,
  CreditCard,
  Database,
  HardDrive,
  KeyRound,
  Mail,
  MessageSquare,
  Activity,
  PenTool,
  Webhook,
  Workflow,
} from "lucide-react"

import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Integrations",
  title: "Works with the tools you already use.",
  description:
    "Connect your stack in a few clicks. Data flows both ways, and every integration is included on every plan.",
}

const all = { label: "Browse all integrations", href: "#" }

const integrations = [
  { name: "Atlas", category: "Database", icon: Database },
  { name: "Ledger", category: "Payments", icon: CreditCard },
  { name: "Relay", category: "Messaging", icon: MessageSquare },
  { name: "Parcel", category: "Email", icon: Mail },
  { name: "Beacon", category: "Analytics", icon: BarChart3 },
  { name: "Pulse", category: "Monitoring", icon: Activity },
  { name: "Vault", category: "Secrets", icon: KeyRound },
  { name: "Harbor", category: "Storage", icon: HardDrive },
  { name: "Forge", category: "Automation", icon: Workflow },
  { name: "Canvas", category: "Design", icon: PenTool },
  { name: "Signal", category: "Alerts", icon: Bell },
  { name: "Hooks", category: "Webhooks", icon: Webhook },
]

export function Integrations01({ id = "integrations" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader {...header} align="left">
            <a href={all.href} className="group inline-flex items-center gap-1 text-sm font-medium">
              {all.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </SectionHeader>
        </div>
        <div className="overflow-hidden rounded-2xl border">
          <ul className="-mr-px -mb-px grid grid-cols-2 sm:grid-cols-3">
            {integrations.map(({ name, category, icon: Icon }) => (
              <li
                key={name}
                className="flex flex-col items-center gap-3 border-r border-b px-4 py-8 text-center transition-colors hover:bg-muted/30"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border bg-background shadow-xs">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">{category}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
