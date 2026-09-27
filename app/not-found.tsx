import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Rails, Row, SheetLabel, Spacer } from "@/components/sheet"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Rails />
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="sheet">
          <Spacer className="h-16 sm:h-24" />
          <Row>
            <SheetLabel index="404" className="px-4 py-3 md:px-6">
              Page not found
            </SheetLabel>
          </Row>
          <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl">
            <Row as="span" className="px-4 py-2 md:px-6">
              This sheet is missing.
            </Row>
          </h1>
          <Row>
            <p className="max-w-xl px-4 py-3 text-lg text-balance text-muted-foreground md:px-6">
              The page you are looking for is not in the set. It may have moved, or it never
              existed.
            </p>
          </Row>
          <Row>
            <div className="flex flex-wrap items-center gap-3 px-4 py-4 md:px-6">
              <Link
                href="/"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Back to home
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/blocks"
                className="inline-flex h-10 items-center rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
              >
                Browse blocks
              </Link>
            </div>
          </Row>
          <Spacer className="h-24 sm:h-32" />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
