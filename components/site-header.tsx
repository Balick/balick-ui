import Link from "next/link"

import { CommandMenu } from "@/components/command-menu"
import { GitHubIcon } from "@/components/icons"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header data-site-header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 md:px-6">
        <MobileNav className="md:hidden" />
        <Link href="/" aria-label={`${siteConfig.name} home`} className="mr-2">
          <Logo />
        </Link>
        <MainNav className="hidden md:flex" />
        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu className="size-8 sm:h-8 sm:w-40 lg:w-56" />
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
