import { Github, Linkedin, Triangle, Twitter } from "lucide-react"

import { Container } from "@/registry/balick/ui/section"

const brand = { name: "Acme", href: "#" }

const links = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Blog", href: "#" },
]

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

const socials = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "X", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export function Footer02() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <a href={brand.href} className="flex items-center gap-2 font-semibold tracking-tight">
          <Triangle className="size-5 fill-current" />
          {brand.name}
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="-ml-2 flex items-center gap-1 md:ml-0">
          {socials.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Acme, Inc. All rights reserved.</p>
        <ul className="flex gap-6">
          {legal.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
