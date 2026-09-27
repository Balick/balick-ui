import {
  BarChart3,
  Cloud,
  CreditCard,
  Database,
  GitBranch,
  Globe,
  KeyRound,
  Lock,
  Mail,
  MessageSquare,
  Plug,
  RefreshCw,
  Timer,
  Webhook,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Marquee } from "@/registry/balick/ui/marquee"
import { Section, SectionHeader } from "@/registry/balick/ui/section"

const bars = [38, 52, 44, 68, 58, 76, 62, 88, 72, 96]
const integrations = [Database, Cloud, Mail, CreditCard, MessageSquare, Webhook, GitBranch]

const secondaryFeatures = [
  { icon: Timer, title: "Instant rollbacks", body: "Revert any deploy in one click, without rebuilding." },
  { icon: RefreshCw, title: "Preview environments", body: "Every pull request gets its own live URL." },
  { icon: GitBranch, title: "Git-based workflow", body: "Push to deploy. Branches, reviews and history included." },
]

function Cell({
  icon: Icon,
  title,
  description,
  className,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("group flex flex-col bg-background", className)}>
      <div className="relative flex h-56 items-center justify-center overflow-hidden border-b">
        {children}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Icon className="size-4" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function Features01({ id = "features" }: { id?: string }) {
  return (
    <Section id={id}>
      <SectionHeader
        eyebrow="Features"
        title="Everything you need. Nothing you don't."
        description="A focused set of tools that work together, so your team can spend time on the product instead of the plumbing."
      />

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
        <Cell
          icon={BarChart3}
          title="Real-time analytics"
          description="Understand how people use your product with live dashboards and zero sampling."
          className="md:col-span-2"
        >
          <div className="flex h-32 w-full max-w-md items-end gap-2 px-8">
            {bars.map((height, i) => (
              <span
                key={i}
                style={{ height: `${height}%` }}
                className="flex-1 origin-bottom rounded-sm bg-foreground/10 transition-transform duration-500 group-hover:scale-y-105 last:bg-foreground"
              />
            ))}
          </div>
        </Cell>

        <Cell
          icon={Globe}
          title="Global edge network"
          description="Served from 300+ locations, milliseconds away from every user."
        >
          <div className="relative flex size-40 items-center justify-center">
            {[100, 72, 44].map((size) => (
              <span
                key={size}
                style={{ width: `${size}%`, height: `${size}%` }}
                className="absolute rounded-full border border-dashed"
              />
            ))}
            {[
              "top-3 left-1/2",
              "top-1/2 right-2",
              "bottom-6 left-6",
              "top-10 left-8",
            ].map((position) => (
              <span key={position} className={cn("absolute size-1.5 rounded-full bg-foreground/40", position)} />
            ))}
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/30 motion-reduce:animate-none" />
              <span className="relative inline-flex size-3 rounded-full bg-foreground" />
            </span>
          </div>
        </Cell>

        <Cell
          icon={Lock}
          title="Secure by default"
          description="Encryption at rest and in transit, SSO and audit logs on every plan."
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute size-36 rounded-3xl border bg-muted/40 transition-transform duration-500 group-hover:rotate-6" />
            <span className="absolute size-24 rounded-2xl border bg-background transition-transform duration-500 group-hover:-rotate-6" />
            <span className="relative flex size-12 items-center justify-center rounded-xl bg-foreground text-background">
              <KeyRound className="size-5" />
            </span>
          </div>
        </Cell>

        <Cell
          icon={Plug}
          title="Integrates with your stack"
          description="Connect databases, payments, email and messaging in a few clicks, or build your own with webhooks."
          className="md:col-span-2"
        >
          <div className="flex w-full flex-col gap-3">
            {[false, true].map((reverse) => (
              <Marquee key={String(reverse)} reverse={reverse} fade duration="28s" gap="0.75rem">
                {integrations.map((Icon, i) => (
                  <span
                    key={i}
                    className="flex size-14 items-center justify-center rounded-xl border bg-background shadow-xs"
                  >
                    <Icon className="size-5 text-muted-foreground" />
                  </span>
                ))}
              </Marquee>
            ))}
          </div>
        </Cell>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {secondaryFeatures.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
