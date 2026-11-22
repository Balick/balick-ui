import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { TemplateGrid } from "@/components/templates/template-grid"
import { defaultPlan } from "@/config/pro"
import { templates } from "@/content/templates"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Complete landing pages for shadcn/ui and Next.js: SaaS, AI, fintech, waitlist, portfolio and more. Preview them live, install one with a single command.",
  alternates: { canonical: "/templates" },
}

const pad = "px-4 md:px-6"

export default function TemplatesPage() {
  const pro = templates.filter((template) => template.tier === "pro")
  const free = templates.filter((template) => template.tier === "free")

  return (
    <div className="sheet">
      <Spacer className="h-12 sm:h-16" />
      <Row>
        <SheetLabel className={cn(pad, "justify-center py-3")}>
          {templates.length} templates · {free.length} free
        </SheetLabel>
      </Row>
      <h1 className="text-center text-5xl font-semibold tracking-tighter sm:text-6xl">
        <Row as="span" className={cn(pad, "py-2")}>
          Templates
        </Row>
      </h1>
      <Row>
        <p className={cn(pad, "mx-auto max-w-2xl py-3 text-center text-lg text-balance text-muted-foreground")}>
          Complete pages assembled from blocks. Preview them live at any width, install one with a single
          command, or open it in the composer and make it yours.
        </p>
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-center gap-3 py-4")}>
          {pro.length > 0 && (
            <Link
              href="/pro"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Get every template from ${defaultPlan.price}
              <ArrowRight className="size-4" />
            </Link>
          )}
          <Link
            href="/compose"
            className="inline-flex h-10 items-center rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
          >
            Compose your own
          </Link>
        </div>
      </Row>

      {pro.length > 0 && (
        <>
          <Spacer marks className="h-10 sm:h-12" />
          <Row>
            <div className={cn(pad, "flex flex-wrap items-center justify-between gap-2 py-3")}>
              <SheetLabel index="01">Pro templates</SheetLabel>
              <Link href="/pro" className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase hover:text-foreground">
                Included in Balick UI Pro →
              </Link>
            </div>
          </Row>
          <Row>
            <TemplateGrid templates={pro} priority={3} />
          </Row>
        </>
      )}

      <Spacer marks className="h-10 sm:h-12" />
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center justify-between gap-2 py-3")}>
          <SheetLabel index={pro.length > 0 ? "02" : "01"}>Free templates</SheetLabel>
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">MIT licensed</span>
        </div>
      </Row>
      <Row>
        <TemplateGrid templates={free} priority={pro.length > 0 ? 0 : 3} />
      </Row>

      <Spacer marks className="h-10 sm:h-12" />
      <Row>
        <div className={cn(pad, "flex flex-col items-center gap-4 py-10 text-center")}>
          <h2 className="text-2xl font-semibold tracking-tight">Need another layout?</h2>
          <p className="max-w-md text-balance text-muted-foreground">
            Every template is a list of blocks. Start from one in the composer, or arrange your own page
            from scratch.
          </p>
          <Link
            href="/compose"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Open the composer
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
