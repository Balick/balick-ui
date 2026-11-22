import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, KeyRound, Minus, Plus, ShoppingBag, Terminal } from "lucide-react"

import { fillerClasses } from "@/components/category-grid"
import { CheckoutButton } from "@/components/pro/checkout-button"
import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { TemplateGrid } from "@/components/templates/template-grid"
import { defaultPlan, proConfig } from "@/config/pro"
import { siteConfig } from "@/config/site"
import { blockCategories, freeBlocks, proBlocks } from "@/content/blocks"
import { componentDocs } from "@/content/components"
import { templates } from "@/content/templates"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Pro",
  description: `Premium blocks and complete templates for shadcn/ui. Pay once from $${defaultPlan.price}, get lifetime updates, install with the shadcn CLI.`,
  alternates: { canonical: "/pro" },
}

const pad = "px-4 md:px-6"

function Intro({ index, label, title, description }: { index: string; label: string; title: string; description: React.ReactNode }) {
  return (
    <>
      <Row>
        <SheetLabel index={index} className={cn(pad, "justify-center py-3")}>
          {label}
        </SheetLabel>
      </Row>
      <Row>
        <h2 className={cn(pad, "py-2 text-center text-4xl font-semibold tracking-tighter text-balance sm:text-5xl")}>{title}</h2>
      </Row>
      <Row>
        <p className={cn(pad, "mx-auto max-w-2xl py-3 text-center text-lg text-balance text-muted-foreground")}>{description}</p>
      </Row>
    </>
  )
}

export default function ProPage() {
  const proTemplates = templates.filter((template) => template.tier === "pro")
  const freeTemplates = templates.filter((template) => template.tier === "free")
  const categories = blockCategories
    .map((category) => ({ ...category, blocks: proBlocks.filter((block) => block.category === category.slug) }))
    .filter((category) => category.blocks.length > 0)
  const [personal, team] = proConfig.plans

  const comparison: { label: string; free: React.ReactNode; pro: React.ReactNode }[] = [
    { label: "Animated components", free: `All ${componentDocs.length}`, pro: `All ${componentDocs.length}` },
    { label: "Blocks", free: `${freeBlocks.length} blocks`, pro: `${freeBlocks.length + proBlocks.length} blocks` },
    { label: "Templates", free: `${freeTemplates.length} templates`, pro: `${templates.length} templates` },
    { label: "Composer and one-command install", free: true, pro: true },
    { label: "Light and dark, Radix and Base UI", free: true, pro: true },
    { label: "Commercial and client projects", free: "MIT", pro: "Unlimited" },
    { label: "Open in v0", free: true, pro: "Free items" },
    { label: "New Pro blocks and templates", free: false, pro: "Lifetime" },
    { label: "Support", free: "GitHub issues", pro: "Email, priority on Team" },
  ]

  const faqs = [
    {
      question: "What exactly do I get?",
      answer: `Every Pro block and template, as source code you install with the shadcn CLI: ${proBlocks.length} blocks and ${proTemplates.length} templates today, plus everything added later. The code lands in your project; there is no package to update and no runtime dependency on us.`,
    },
    {
      question: "Is it a subscription?",
      answer: "No. You pay once and keep access for life, including future blocks and templates. There is nothing to renew.",
    },
    {
      question: "Can I use Pro in client projects?",
      answer:
        "Yes, in as many personal and client projects as you like, commercial or not. What you cannot do is redistribute the blocks themselves, for example in a UI kit, a template marketplace or a public repository.",
    },
    {
      question: "Which plan do I need?",
      answer: `${personal.name} covers one developer. ${team.name} covers up to 10 developers sharing one key, including in CI and preview deployments.`,
    },
    {
      question: "How does installing work?",
      answer: `Right after the purchase, your license key is in your Polar customer portal, linked from the receipt. Add the Pro registry to components.json, put the key in .env.local as ${proConfig.envVar}, then run npx shadcn add ${proConfig.namespace}/<block>. The key is sent as a header and never written into your code.`,
    },
    {
      question: "What does my project need?",
      answer:
        "A React project set up with shadcn/ui and Tailwind CSS v4, with either the Radix or the Base UI style. The blocks are tested with Next.js 15 and React 19, and most of them work with any React framework.",
    },
    {
      question: "Can I try before I buy?",
      answer: "Yes. Every Pro block and template has a live preview at every width, in light and dark mode, and the free blocks show the quality of the code.",
    },
    {
      question: "What if it is not for me?",
      answer: `Write within ${proConfig.refundDays} days of your purchase and you get a full refund, no questions asked.`,
    },
    {
      question: "Who handles payment and taxes?",
      answer: "Polar, our merchant of record. It accepts cards worldwide, calculates VAT and sales tax, and sends you an invoice.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: proConfig.name,
    description: metadata.description,
    url: `${siteConfig.url}/pro`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: proConfig.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
      priceCurrency: "USD",
      url: `${siteConfig.url}/pro#pricing`,
      availability: "https://schema.org/InStock",
    })),
  }

  return (
    <div className="sheet">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Spacer className="h-16 sm:h-24" />
      <Row>
        <SheetLabel className={cn(pad, "justify-center py-3")}>{proConfig.name}</SheetLabel>
      </Row>
      <h1 className="text-center text-[clamp(2.25rem,10vw,3rem)] font-semibold tracking-[-0.045em] sm:text-7xl">
        <Row as="span" className={cn(pad, "pt-2 pb-1 leading-[1.05]")}>
          Launch a premium site
        </Row>
        <Row as="span" className={cn(pad, "pt-2 pb-1 leading-[1.05] text-muted-foreground")}>
          this afternoon.
        </Row>
      </h1>
      <Row>
        <p className={cn(pad, "mx-auto max-w-2xl py-4 text-center text-lg text-balance text-muted-foreground")}>
          {proBlocks.length > 0
            ? `${proBlocks.length} Pro blocks and ${proTemplates.length} complete templates for shadcn/ui`
            : "Premium blocks and complete templates for shadcn/ui"}
          , designed with the same care as the free ones. Preview everything, pay once, install with the CLI you
          already use.
        </p>
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          <CheckoutButton plan={defaultPlan} label={`Get Pro for $${defaultPlan.price}`} source="pro-hero" />
          <Link
            href="#templates"
            className="inline-flex h-10 items-center rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
          >
            See what is inside
          </Link>
        </div>
      </Row>
      <Row>
        <ul className={cn(pad, "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 text-sm text-muted-foreground")}>
          {["One-time payment", "Lifetime updates", `${proConfig.refundDays}-day refund`, "Unlimited projects"].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-foreground" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Row>

      {/* Figures, templates and blocks: only where the Pro sources are available (see scripts/pro.mjs). */}
      {proBlocks.length > 0 && (
        <>
          <Spacer marks />
          <Row>
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: proBlocks.length, label: "Pro blocks" },
                { value: proTemplates.length, label: "Pro templates" },
                { value: categories.length, label: "Categories" },
                { value: `$${defaultPlan.price}`, label: "Once, for life" },
              ].map((figure, index) => (
                <div
                  key={figure.label}
                  className={cn(
                    "flex flex-col gap-2 border-rule px-4 py-8 md:px-6",
                    index % 2 === 0 && "border-r",
                    index < 2 && "border-b md:border-b-0",
                    index === 1 && "md:border-r"
                  )}
                >
                  <dt className="order-last font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{figure.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tighter tabular-nums">{figure.value}</dd>
                </div>
              ))}
            </dl>
          </Row>

          {/* Templates */}
          <Spacer marks />
          <div id="templates" className="scroll-mt-14">
            <Intro
              index="01"
              label="Templates"
              title="Complete pages, ready to ship."
              description="Each template is a full page you install in one command, then edit like your own code. Open one to preview it live."
            />
          </div>
          <Spacer className="h-8 sm:h-10" />
          <Row top>
            <TemplateGrid templates={proTemplates} />
          </Row>

          {/* Blocks */}
          <Spacer marks />
          <Intro
            index="02"
            label="Blocks"
            title={`${proBlocks.length} blocks you will not find elsewhere.`}
            description="Interactive heroes, product tours, pricing calculators and more. Every one is built on the same primitives as the free blocks, so they mix freely."
          />
          <Spacer className="h-8 sm:h-10" />
          <Row top>
            <div className="overflow-hidden">
              <ul className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <li key={category.slug} className="border-r border-b border-rule p-5 md:px-6">
                    <p className="flex items-center justify-between font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                      {category.title}
                      <span>{category.blocks.length}</span>
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {category.blocks.map((block) => (
                        <li key={block.name}>
                          <Link
                            href={`/blocks/${category.slug}#${block.name}`}
                            className="text-sm transition-colors hover:text-muted-foreground"
                          >
                            {block.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                {fillerClasses(categories.length, [
                  { columns: 1, show: "block", hide: "hidden" },
                  { columns: 2, show: "sm:block", hide: "sm:hidden" },
                  { columns: 4, show: "lg:block", hide: "lg:hidden" },
                ]).map((classes, index) => (
                  <li key={index} aria-hidden className={cn("border-r border-b border-rule bg-hatch", classes)} />
                ))}
              </ul>
            </div>
          </Row>
        </>
      )}

      {/* Pricing */}
      <Spacer marks />
      <div id="pricing" className="scroll-mt-14">
        <Intro
          index="03"
          label="Pricing"
          title="Pay once. Use it forever."
          description={`No subscription. Every plan includes all Pro blocks and templates, today and in the future, with a ${proConfig.refundDays}-day refund.`}
        />
      </div>
      <Spacer className="h-8 sm:h-10" />
      <Row top>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {proConfig.plans.map((plan, index) => {
            const featured = plan.id === "team"
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col p-6 sm:p-10",
                  index === 0 && "border-b border-rule md:border-r md:border-b-0",
                  featured && "bg-foreground/[0.025]"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  <span className="rounded-full border bg-card px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {plan.seats}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-6xl font-semibold tracking-tighter tabular-nums">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">USD, one-time</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 shrink-0" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <CheckoutButton
                  plan={plan}
                  label={`Get ${plan.name}`}
                  source="pro-pricing"
                  variant={featured ? "primary" : "secondary"}
                  className="mt-10 w-full"
                />
              </div>
            )
          })}
        </div>
      </Row>
      <Row>
        <p className={cn(pad, "py-4 text-center text-xs text-balance text-muted-foreground")}>
          Prices in US dollars; taxes are calculated at checkout. Payments are handled by Polar, our merchant of
          record. See the{" "}
          <Link href="/license" className="text-foreground underline underline-offset-4">
            license
          </Link>
          .
        </p>
      </Row>

      {/* Comparison */}
      <Spacer marks />
      <Intro
        index="04"
        label="Free and Pro"
        title="Pro adds to the free blocks."
        description="The open-source blocks and components stay free, under the MIT license. Pro is for teams who want more, ready-made."
      />
      <Spacer className="h-8 sm:h-10" />
      <Row top>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-rule text-left">
                <th scope="col" className={cn(pad, "py-3 font-mono text-[11px] font-normal tracking-wider text-muted-foreground uppercase")}>
                  Feature
                </th>
                <th scope="col" className="w-1/4 border-l border-rule px-4 py-3 font-medium">
                  Free
                </th>
                <th scope="col" className="w-1/4 border-l border-rule bg-foreground/[0.025] px-4 py-3 font-medium">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-rule last:border-b-0">
                  <th scope="row" className={cn(pad, "py-3 text-left font-normal text-muted-foreground")}>
                    {row.label}
                  </th>
                  {[row.free, row.pro].map((value, index) => (
                    <td key={index} className={cn("border-l border-rule px-4 py-3", index === 1 && "bg-foreground/[0.025]")}>
                      {value === true ? (
                        <Check className="size-4" aria-label="Included" />
                      ) : value === false ? (
                        <Minus className="size-4 text-muted-foreground" aria-label="Not included" />
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>

      {/* How it works */}
      <Spacer marks />
      <Intro
        index="05"
        label="How it works"
        title="Three steps to your first Pro block."
        description="No new package, no account to create. The shadcn CLI you already use sends your key with each request."
      />
      <Spacer className="h-8 sm:h-10" />
      <Row top>
        <ol className="grid grid-cols-1 md:grid-cols-3">
          {[
            { icon: ShoppingBag, title: "Buy once", body: "Pay with Polar. Your license key is ready right after checkout, in your customer portal." },
            {
              icon: KeyRound,
              title: "Add your key",
              body: `Declare the ${proConfig.namespace} registry in components.json and put the key in .env.local.`,
            },
            { icon: Terminal, title: "Install", body: `Run npx shadcn add ${proConfig.namespace}/hero-04, or install a whole template.` },
          ].map((step, index) => (
            <li
              key={step.title}
              className={cn("p-6 md:px-6", index < 2 && "border-b border-rule md:border-r md:border-b-0")}
            >
              <span className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
                <step.icon className="size-4 text-foreground" aria-hidden />
              </span>
              <p className="mt-8 font-medium">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Row>
      <Row>
        <div className={cn(pad, "py-4 text-center")}>
          <Link href="/docs/pro" className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline hover:underline-offset-4">
            Read the setup guide
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Row>

      {/* FAQ */}
      <Spacer marks />
      <Intro index="06" label="Questions" title="Before you buy." description="Anything else? Ask on GitHub, we answer quickly." />
      <Spacer className="h-8 sm:h-10" />
      <Row top>
        <div className="mx-auto max-w-3xl divide-y divide-rule">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className={cn(pad, "flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden")}>
                {faq.question}
                <Plus className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className={cn(pad, "-mt-1 pb-5 text-sm leading-6 text-muted-foreground")}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Row>

      {/* Final call to action */}
      <Spacer marks />
      <Row>
        <div className={cn(pad, "flex flex-col items-center gap-5 py-16 text-center")}>
          <h2 className="max-w-xl text-4xl font-semibold tracking-tighter text-balance sm:text-5xl">
            Your next launch, already designed.
          </h2>
          <p className="text-muted-foreground">
            {proConfig.name}, from ${defaultPlan.price}. Pay once, use it forever.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <CheckoutButton plan={defaultPlan} label={`Get Pro for $${defaultPlan.price}`} source="pro-footer" />
            <Link
              href="/templates"
              className="inline-flex h-10 items-center rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
            >
              Browse templates
            </Link>
          </div>
        </div>
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
