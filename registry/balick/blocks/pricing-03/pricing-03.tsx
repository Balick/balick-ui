import { Check, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Compare plans",
  title: "Every feature, side by side.",
  description: "Start free and upgrade when you need to. Every plan includes the core platform.",
}

const plans = [
  { name: "Hobby", price: "$0", period: "forever", cta: { label: "Start for free", href: "#" } },
  {
    name: "Pro",
    price: "$20",
    period: "per user / month",
    cta: { label: "Start free trial", href: "#" },
    featured: true,
  },
  { name: "Enterprise", price: "Custom", period: "billed yearly", cta: { label: "Contact sales", href: "#" } },
]

/** true: included, false: not included, string: included with this limit. */
type Value = boolean | string

const groups: { name: string; features: { name: string; values: Value[] }[] }[] = [
  {
    name: "Platform",
    features: [
      { name: "Projects", values: ["3", "Unlimited", "Unlimited"] },
      { name: "Preview deployments", values: [true, true, true] },
      { name: "Custom domains", values: ["1", "50", "Unlimited"] },
      { name: "Build minutes", values: ["100 / month", "6,000 / month", "Custom"] },
    ],
  },
  {
    name: "Collaboration",
    features: [
      { name: "Team members", values: ["1", "Up to 20", "Unlimited"] },
      { name: "Comments on previews", values: [false, true, true] },
      { name: "Roles and permissions", values: [false, true, true] },
    ],
  },
  {
    name: "Security and support",
    features: [
      { name: "SSO (SAML)", values: [false, false, true] },
      { name: "Audit logs", values: [false, "30 days", "Unlimited"] },
      { name: "Uptime SLA", values: [false, false, "99.99%"] },
      { name: "Support", values: ["Community", "Email", "Dedicated"] },
    ],
  },
]

function Cell({ value }: { value: Value }) {
  if (value === true) {
    return (
      <>
        <Check className="inline-block size-4" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (value === false) {
    return (
      <>
        <Minus className="inline-block size-4 text-muted-foreground/60" aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return <>{value}</>
}

export function Pricing03({ id = "pricing" }: { id?: string }) {
  return (
    <Section id={id}>
      <SectionHeader {...header} />
      {/* Small screens get one card per plan; the table needs room for every column. */}
      <div className="mt-16 grid grid-cols-1 gap-4 md:hidden">
        {plans.map((plan, planIndex) => (
          <div
            key={plan.name}
            className={cn("rounded-xl border p-6", plan.featured ? "bg-muted/40" : "bg-card")}
          >
            <h3 className="flex items-center gap-2 font-medium">
              {plan.name}
              {plan.featured && (
                <span className="rounded-full bg-foreground px-2 py-0.5 text-[11px] text-background">
                  Popular
                </span>
              )}
            </h3>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tighter">{plan.price}</span>
              <span className="text-xs text-muted-foreground">{plan.period}</span>
            </p>
            <Button
              asChild
              size="sm"
              variant={plan.featured ? "default" : "outline"}
              className="mt-4 w-full"
            >
              <a href={plan.cta.href}>{plan.cta.label}</a>
            </Button>
            {groups.map((group) => (
              <div key={group.name} className="mt-8">
                <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {group.name}
                </p>
                <dl className="mt-3 divide-y border-y text-sm">
                  {group.features.map((feature) => (
                    <div key={feature.name} className="flex items-center justify-between gap-4 py-3">
                      <dt>{feature.name}</dt>
                      <dd className="text-right">
                        <Cell value={feature.values[planIndex]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="relative mt-16 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] table-fixed border-collapse text-sm">
          <caption className="sr-only">Plan comparison</caption>
          <colgroup>
            <col className="w-[34%]" />
            {plans.map((plan) => (
              <col key={plan.name} className={cn(plan.featured && "bg-muted/40")} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <td className="p-4 pl-0" />
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className="p-4 text-left align-bottom font-normal"
                >
                  <span className="flex items-center gap-2 font-medium">
                    {plan.name}
                    {plan.featured && (
                      <span className="rounded-full bg-foreground px-2 py-0.5 text-[11px] text-background">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="mt-3 block text-3xl font-semibold tracking-tighter">{plan.price}</span>
                  <span className="block text-xs text-muted-foreground">{plan.period}</span>
                  <Button
                    asChild
                    size="sm"
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-4 w-full"
                  >
                    <a href={plan.cta.href}>{plan.cta.label}</a>
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.name}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={plans.length + 1}
                  className="border-b pt-10 pb-3 text-left font-mono text-xs font-normal tracking-wider text-muted-foreground uppercase"
                >
                  {group.name}
                </th>
              </tr>
              {group.features.map((feature) => (
                <tr key={feature.name} className="border-b">
                  <th scope="row" className="py-4 pr-4 text-left font-normal">
                    {feature.name}
                  </th>
                  {feature.values.map((value, index) => (
                    <td key={plans[index].name} className="p-4 text-center">
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </Section>
  )
}
