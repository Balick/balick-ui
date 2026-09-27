"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Section } from "@/registry/balick/ui/section"

const content = {
  eyebrow: "Newsletter",
  title: "Stay in the loop.",
  description: "One email a month with product updates, guides and what we are building next.",
  note: "No spam. Unsubscribe in one click.",
}

/** Where the email is sent. Leave empty to only show the confirmation. */
const endpoint = ""

export function Newsletter01({ id = "newsletter" }: { id?: string }) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(event.currentTarget),
        })
        if (!response.ok) throw new Error(response.statusText)
      }
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section id={id}>
      <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tighter text-balance sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-balance text-muted-foreground">{content.description}</p>
        </div>
        <div>
          {status === "sent" ? (
            <p role="status" className="flex items-center gap-3 text-sm font-medium">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="size-4" aria-hidden />
              </span>
              Thanks! Check your inbox to confirm your subscription.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor={`${id}-email`} className="sr-only">
                Email address
              </label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-10 flex-1"
              />
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          )}
          {status !== "sent" && (
            <p aria-live="polite" className="mt-3 text-xs text-muted-foreground">
              {status === "error" ? "Something went wrong. Please try again." : content.note}
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}
