import Link from "next/link"

import { LogoMark } from "@/components/logo"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <LogoMark className="size-4 text-foreground" />
          <span>
            Built on{" "}
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="text-foreground underline-offset-4 hover:underline">
              shadcn/ui
            </a>
            . Open source.
          </span>
        </div>
        <nav className="flex gap-5">
          <Link href="/docs" className="hover:text-foreground">Docs</Link>
          <Link href="/docs/components" className="hover:text-foreground">Components</Link>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
