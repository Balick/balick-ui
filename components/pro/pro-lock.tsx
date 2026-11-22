import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

import { defaultPlan } from "@/config/pro"
import { cn } from "@/lib/utils"

/** Stands in for the source code of a Pro item. */
export function ProLock({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border bg-hatch px-6 py-16 text-center", className)}>
      <span className="flex size-10 items-center justify-center rounded-full border bg-card shadow-xs">
        <Lock className="size-4" aria-hidden />
      </span>
      <p className="mt-5 font-medium">{title} is a Pro block</p>
      <p className="mt-2 max-w-sm text-sm text-balance text-muted-foreground">
        Its source code comes with Balick UI Pro. Preview it freely, then install it with the shadcn CLI once
        you have a license key.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/pro"
          className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Get Pro from ${defaultPlan.price}
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/docs/pro"
          className="inline-flex h-9 items-center rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
        >
          I have a license
        </Link>
      </div>
    </div>
  )
}
