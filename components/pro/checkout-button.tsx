"use client"

import { track } from "@vercel/analytics"
import { ArrowRight } from "lucide-react"

import { proConfig, type ProPlan } from "@/config/pro"
import { cn } from "@/lib/utils"

const styles = {
  primary: "bg-foreground text-background hover:opacity-85",
  secondary: "border bg-card shadow-xs hover:bg-accent",
}

/**
 * Opens the checkout of a plan (a Polar checkout link). Clicks are counted
 * with Vercel Analytics. Without a checkout link, as on previews, the button
 * says so instead of leading nowhere.
 */
export function CheckoutButton({
  plan,
  label = `Get ${plan.name}`,
  source,
  variant = "primary",
  className,
}: {
  plan: ProPlan
  label?: string
  /** Where the button is, for the analytics event. */
  source: string
  variant?: keyof typeof styles
  className?: string
}) {
  const base = cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-opacity",
    styles[variant],
    className
  )

  if (!plan.checkoutUrl) {
    return (
      <span aria-disabled className={cn(base, "cursor-not-allowed opacity-60 hover:opacity-60")}>
        Checkout opens soon
      </span>
    )
  }

  return (
    <a
      href={plan.checkoutUrl}
      onClick={() => track("pro_checkout", { plan: plan.id, price: plan.price, source })}
      className={cn("group", base)}
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </a>
  )
}

export const planById = (id: ProPlan["id"]) => proConfig.plans.find((plan) => plan.id === id)!
