import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        <GridPattern className="[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]" />
        <span className="relative rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
          404
        </span>
        <h1 className="relative mt-6 text-4xl font-semibold tracking-tighter sm:text-5xl">
          Page not found
        </h1>
        <p className="relative mt-4 max-w-md text-balance text-muted-foreground">
          This page does not exist, or it has moved. Try one of these instead.
        </p>
        <div className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Back to home
          </Link>
          <Link
            href="/blocks"
            className="inline-flex h-10 items-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Browse blocks
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
