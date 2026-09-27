"use client"

import * as React from "react"
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Contact",
  title: "Talk to our team.",
  description: "Questions about plans, a demo or a custom setup? We reply within one business day.",
}

const details = [
  { label: "Email", value: "hello@acme.com", href: "mailto:hello@acme.com", icon: Mail },
  { label: "Phone", value: "+1 (555) 010-2030", href: "tel:+15550102030", icon: Phone },
  { label: "Office", value: "221 Market Street, San Francisco, CA", href: "#", icon: MapPin },
  { label: "Hours", value: "Monday to Friday, 9:00 to 18:00 PT", icon: Clock },
]

/** Where the form is sent. Leave empty to only show the confirmation. */
const endpoint = ""

export function Contact02({ id = "contact" }: { id?: string }) {
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
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader {...header} align="left" />
          <dl className="mt-12 grid grid-cols-1 gap-6">
            {details.map(({ label, value, href, icon: Icon }) => (
              <div key={label} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col">
                  <dt className="text-sm font-medium">{label}</dt>
                  <dd className="text-sm text-muted-foreground">
                    {href ? (
                      <a href={href} className="transition-colors hover:text-foreground">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border p-6 sm:p-8">
          {status === "sent" ? (
            <div role="status" className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="size-5" aria-hidden />
              </span>
              <h3 className="mt-6 font-medium">Message sent</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                Thanks for reaching out. We will get back to you within one business day.
              </p>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor={`${id}-name`}>Name</Label>
                <Input id={`${id}-name`} name="name" autoComplete="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor={`${id}-company`}>
                  Company <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id={`${id}-company`} name="company" autoComplete="organization" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor={`${id}-message`}>Message</Label>
                <Textarea
                  id={`${id}-message`}
                  name="message"
                  className="min-h-40"
                  required
                  placeholder="Tell us about your project"
                />
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className="text-sm text-muted-foreground">
                  {status === "error"
                    ? "Something went wrong. Please try again or email us."
                    : "We never share your details."}
                </p>
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
