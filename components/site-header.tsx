import Link from "next/link"

import { CommandMenu } from "@/components/command-menu"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Mark } from "@/components/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"
import { GitHubIcon } from "@/registry/balick/ui/social-icons"

export function SiteHeader() {
  return (
    <header
      data-site-header
      className="sticky top-0 z-40 w-full border-b border-rule bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
    >
      <div className="sheet relative flex h-14 items-center gap-4 px-4 md:px-6">
        <Mark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Mark className="right-0 bottom-0 translate-1/2" />
        <MobileNav className="-ml-1.5 md:hidden" />
        <Link href="/" aria-label={`${siteConfig.name} home`} className="mr-2">
          <Logo />
        </Link>
        <MainNav className="hidden md:flex" />
        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu className="size-8 lg:h-8 lg:w-56" />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
