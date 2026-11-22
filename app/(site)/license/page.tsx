import type { Metadata } from "next"
import Link from "next/link"

import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { proConfig } from "@/config/pro"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "License",
  description: `The terms of the free blocks (MIT) and of ${proConfig.name}.`,
  alternates: { canonical: "/license" },
}

const pad = "px-4 md:px-6"

const sections: { title: string; body: React.ReactNode[] }[] = [
  {
    title: "Free items",
    body: [
      <>
        The components, blocks and templates that are not marked Pro are open source, under the{" "}
        <a
          href={`${siteConfig.links.github}/blob/main/LICENSE`}
          className="text-foreground underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          MIT license
        </a>
        . Use them for anything, commercial or not.
      </>,
    ],
  },
  {
    title: "What a Pro license allows",
    body: [
      `A ${proConfig.name} license lets the licensed developers install the Pro blocks and templates and use them, modified or not, in an unlimited number of projects: their own, their employer's and their clients', commercial or not.`,
      "The finished projects belong to you or your clients, and can be sold, hosted and shown anywhere, including the source code of a client project handed over to that client.",
    ],
  },
  {
    title: "Seats",
    body: [
      proConfig.plans.map((plan) => `${plan.name}: ${plan.seats.toLowerCase()}.`).join(" "),
      "Each developer who installs or edits Pro blocks needs a seat. People who only use, review or deploy the result do not.",
    ],
  },
  {
    title: "What it does not allow",
    body: [
      "Redistributing the Pro blocks or templates as such, free or paid: in a UI kit, a component library, a template or theme marketplace, a website builder, a starter kit or a public repository.",
      "Sharing your license key outside the seats of your plan, or publishing it.",
      "Using the Pro sources to build a product that competes with Balick UI Pro.",
    ],
  },
  {
    title: "Updates",
    body: [
      "A license is paid once and does not expire. It includes every update and every Pro block and template added later, for as long as Balick UI Pro is published.",
    ],
  },
  {
    title: "Refunds",
    body: [
      `If Pro is not for you, ask for a refund within ${proConfig.refundDays} days of the purchase and you are refunded in full. The license key is then revoked.`,
    ],
  },
  {
    title: "Payment",
    body: [
      "Payments, invoices, taxes and refunds are handled by Polar, the merchant of record. Your purchase is also subject to Polar's terms.",
    ],
  },
  {
    title: "Warranty",
    body: [
      "The blocks are provided as they are, without warranty of any kind. In no event is the author liable for any claim, damages or other liability arising from their use.",
    ],
  },
]

export default function LicensePage() {
  return (
    <div className="sheet">
      <Spacer className="h-12 sm:h-16" />
      <Row>
        <SheetLabel className={cn(pad, "py-3")}>Terms</SheetLabel>
      </Row>
      <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
        <Row as="span" className={cn(pad, "py-2")}>
          License
        </Row>
      </h1>
      <Row>
        <p className={cn(pad, "max-w-2xl py-3 text-lg text-balance text-muted-foreground")}>
          In short: the free items are MIT. With Pro, build as many sites as you like for yourself and your clients;
          just do not resell the blocks themselves.
        </p>
      </Row>
      <Spacer className="h-8 sm:h-10" />
      {sections.map((section, index) => (
        <Row key={section.title}>
          <div className="grid grid-cols-1 md:grid-cols-[16rem_minmax(0,1fr)]">
            <div className={cn(pad, "pt-6 md:border-r md:border-rule md:py-6")}>
              <SheetLabel index={String(index + 1).padStart(2, "0")}>{section.title}</SheetLabel>
            </div>
            <div className={cn(pad, "max-w-3xl space-y-3 py-6 text-sm leading-7 text-muted-foreground")}>
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Row>
      ))}
      <Row>
        <p className={cn(pad, "py-6 text-sm text-muted-foreground")}>
          Questions about the license?{" "}
          <a href={`${siteConfig.links.github}/issues`} className="text-foreground underline underline-offset-4">
            Ask on GitHub
          </a>{" "}
          or see the{" "}
          <Link href="/pro" className="text-foreground underline underline-offset-4">
            Pro page
          </Link>
          .
        </p>
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
