import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { LogoMark } from "@/components/logo"
import { Mark } from "@/components/sheet"
import { SheetPath } from "@/components/sheet-path"
import { siteConfig } from "@/config/site"
import { blockList } from "@/content/blocks"
import { galleryCategories } from "@/lib/blocks-gallery"
import { cn } from "@/lib/utils"

const index = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/blocks" },
  { title: "Compose", href: "/compose" },
  { title: "Templates", href: "/templates" },
]

/** A cell of the title block: a mono label above its value. */
function Cell({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 border-r border-b border-rule p-4 md:px-6", className)}>
      <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  )
}

/**
 * The footer is drawn as the title block of a technical sheet: what the
 * project is, which sheet you are on, when it was updated and who drew it.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="sheet relative">
        <Mark className="top-0 left-0 -translate-1/2" />
        <Mark className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        {/* The grid overflows by a pixel so the outer cell borders hide under the rails. */}
        <div className="overflow-hidden">
          <div className="-mr-px -mb-px grid grid-cols-2 md:grid-cols-12">
            <Cell label="Project" className="col-span-2 md:col-span-5">
              <span className="flex items-center gap-2 font-medium">
                <LogoMark className="size-4" />
                {siteConfig.name}
              </span>
              <span className="mt-1 block text-muted-foreground">
                Open-source blocks for{" "}
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  shadcn/ui
                </a>
                , designed to fit together.
              </span>
            </Cell>
            <Cell label="Sheet" className="col-span-2 md:col-span-3">
              <SheetPath />
            </Cell>
            <Cell label="Blocks" className="md:col-span-2">
              {blockList.length} in {galleryCategories().length} categories
            </Cell>
            <Cell label="Updated" className="md:col-span-2">
              <time dateTime={siteConfig.updated} className="font-mono text-[13px]">
                {siteConfig.updated}
              </time>
            </Cell>
            <Cell label="Index" className="col-span-2 md:col-span-5">
              <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
                {index.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </Cell>
            <Cell label="Drawn by" className="col-span-2 md:col-span-3">
              <a
                href={siteConfig.author.url}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {siteConfig.author.name}
              </a>
            </Cell>
            <Cell label="License" className="md:col-span-2">MIT</Cell>
            <Cell label="Source" className="md:col-span-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
              >
                GitHub
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </a>
            </Cell>
          </div>
        </div>
      </div>
    </footer>
  )
}
