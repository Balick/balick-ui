import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Row, SheetLabel, Spacer } from "@/components/sheet"

export const metadata: Metadata = {
  title: "Templates",
  description: "Full pages assembled from Balick UI blocks. Coming soon.",
}

const planned = [
  { title: "SaaS landing", blocks: "navbar · hero · logos · features · pricing · faq · footer" },
  { title: "Portfolio", blocks: "navbar · hero · about · projects · contact · footer" },
  { title: "Agency", blocks: "navbar · hero · services · steps · team · contact · footer" },
  { title: "Startup", blocks: "navbar · hero · stats · integrations · testimonials · cta · footer" },
  { title: "Waitlist", blocks: "hero · features · newsletter · footer" },
  { title: "Changelog", blocks: "navbar · timeline · newsletter · footer" },
]

export default function TemplatesPage() {
  return (
    <div className="sheet">
      <Spacer className="h-12 sm:h-16" />
      <Row>
        <SheetLabel className="justify-center px-4 py-3 md:px-6">Coming soon</SheetLabel>
      </Row>
      <h1 className="text-center text-5xl font-semibold tracking-tighter sm:text-6xl">
        <Row as="span" className="px-4 py-2 md:px-6">
          Templates
        </Row>
      </h1>
      <Row>
        <p className="mx-auto max-w-2xl px-4 py-3 text-center text-lg text-balance text-muted-foreground md:px-6">
          Complete sites assembled from blocks: install, customise, deploy. Until they land,
          compose your own page from the same blocks.
        </p>
      </Row>
      <Row>
        <div className="px-4 py-4 text-center md:px-6">
          <Link
            href="/compose"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Open the composer
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Row>
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <div className="overflow-hidden">
          <ul className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((template, index) => (
              <li key={template.title} className="flex flex-col border-r border-b border-rule p-6">
                <div aria-hidden className="flex aspect-[16/10] items-end rounded-lg border border-dashed border-mark bg-hatch p-3">
                  <span className="rounded-sm bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    Reserved
                  </span>
                </div>
                <p className="mt-5 font-mono text-[11px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 font-medium">{template.title}</h2>
                <p className="mt-2 font-mono text-xs leading-5 text-muted-foreground">{template.blocks}</p>
              </li>
            ))}
          </ul>
        </div>
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
