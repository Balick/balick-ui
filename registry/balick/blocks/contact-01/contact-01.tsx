"use client"

import * as React from "react"
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from "lucide-react"

import { Section } from "@/registry/balick/ui/section"
import { GitHubIcon, LinkedInIcon } from "@/registry/balick/ui/social-icons"

const content = {
  eyebrow: "Contact",
  title: "Let's build something together.",
  description:
    "Have a project in mind or just want to say hello? My inbox is always open, and I reply within a day.",
  email: "hello@acme.com",
}

const channels = [
  { label: "Email", value: "hello@acme.com", icon: Mail, href: "mailto:hello@acme.com" },
  { label: "WhatsApp", value: "Message me", icon: MessageCircle, href: "#" },
  { label: "LinkedIn", value: "/in/alexmorgan", icon: LinkedInIcon, href: "#" },
  { label: "GitHub", value: "@alexmorgan", icon: GitHubIcon, href: "#" },
]

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
        } catch {}
      }}
      className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  )
}

export function Contact01({ id = "contact" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
          <div>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tighter text-balance sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-balance text-muted-foreground">
              {content.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${content.email}`}
              className="text-lg font-medium break-all underline underline-offset-4 transition-colors hover:text-muted-foreground sm:text-xl"
            >
              {content.email}
            </a>
            <CopyEmail email={content.email} />
          </div>
        </div>
        <ul className="divide-y border-t bg-muted/30 lg:border-t-0 lg:border-l">
          {channels.map(({ label, value, icon: Icon, href }) => (
            <li key={label}>
              <a
                href={href}
                className="group flex items-center gap-4 px-8 py-6 transition-colors hover:bg-muted/60 sm:px-12"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-card">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="truncate text-sm text-muted-foreground">{value}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
