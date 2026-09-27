"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Section, SectionHeader } from "@/registry/balick/ui/section"

type Billing = "monthly" | "yearly"

interface Plan {
  name: string
  description: string
  price: { monthly: number; yearly: number } | null
  cta: string
  featured?: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    name: "Hobby",
    description: "For side projects and experiments.",
    price: { monthly: 0, yearly: 0 },
    cta: "Start for free",
    features: ["1 project", "10k monthly events", "Community support", "7-day data retention"],
  },
  {
    name: "Pro",
    description: "For growing teams shipping every day.",
    price: { monthly: 24, yearly: 19 },
    cta: "Start 14-day trial",
    featured: true,
    features: [
      "Unlimited projects",
      "1M monthly events",
      "Priority support",
      "90-day data retention",
      "Team roles & SSO",
    ],
  },
  {
    name: "Enterprise",
    description: "For organisations with custom needs.",
    price: null,
    cta: "Contact sales",
    features: [
      "Everything in Pro",
      "Unlimited events",
      "Dedicated manager",
      "Custom contracts & SLA",
      "Audit logs",
    ],
  },
]

function BillingToggle({
  value,
  onChange,
}: {
  value: Billing
  onChange: (value: Billing) => void
}) {
  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full border bg-muted/50 p-1">
      {(["monthly", "yearly"] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "relative h-8 cursor-pointer rounded-full px-4 text-sm font-medium capitalize transition-colors",
            value === option ? "text-background" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === option && (
            <motion.span
              layoutId="pricing-01-billing"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="absolute inset-0 rounded-full bg-foreground"
            />
          )}
          <span className="relative flex items-center gap-1.5">
            {option}
            {option === "yearly" && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-px text-[10px] leading-4",
                  value === option ? "bg-background/20" : "bg-foreground/10 text-foreground"
                )}
              >
                −20%
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}

function Price({ plan, billing }: { plan: Plan; billing: Billing }) {
  if (!plan.price) {
    return <span className="text-4xl font-semibold tracking-tighter">Custom</span>
  }
  const amount = plan.price[billing]

  return (
    <div className="flex items-baseline">
      <span className="text-4xl font-semibold tracking-tighter">$</span>
      <span className="relative inline-flex overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={amount}
            initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-4xl font-semibold tracking-tighter tabular-nums"
          >
            {amount}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="ml-2 text-sm opacity-60">/ user / month</span>
    </div>
  )
}

export function Pricing01({ id = "pricing" }: { id?: string }) {
  const [billing, setBilling] = React.useState<Billing>("yearly")

  return (
    <Section id={id}>
      <SectionHeader
        eyebrow="Pricing"
        title="Simple pricing that scales with you."
        description="Start for free, upgrade when you need to. No hidden fees."
      >
        <BillingToggle value={billing} onChange={setBilling} />
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-8",
              plan.featured
                ? "border-foreground bg-foreground text-background shadow-[0_24px_64px_-24px_rgb(0_0_0/0.35)]"
                : "bg-card"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{plan.name}</h3>
              {plan.featured && (
                <span className="rounded-full bg-background/15 px-2.5 py-0.5 text-xs font-medium">
                  Most popular
                </span>
              )}
            </div>
            <p className={cn("mt-2 text-sm", plan.featured ? "opacity-70" : "text-muted-foreground")}>
              {plan.description}
            </p>
            <div className="mt-8 h-10">
              <Price plan={plan} billing={billing} />
            </div>
            <p className={cn("mt-1 h-5 text-xs", plan.featured ? "opacity-60" : "text-muted-foreground")}>
              {plan.price && plan.price.monthly > 0 && billing === "yearly" ? "Billed annually" : ""}
            </p>
            <Button
              size="lg"
              variant={plan.featured ? "secondary" : "outline"}
              className="mt-6 w-full"
            >
              {plan.cta}
            </Button>
            <ul className="mt-8 flex flex-col gap-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className={cn("size-4 shrink-0", plan.featured ? "opacity-80" : "text-muted-foreground")} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Prices in USD. Taxes may apply. Need something else?{" "}
        <a href="#" className="text-foreground underline underline-offset-4">
          Talk to us
        </a>
        .
      </p>
    </Section>
  )
}
