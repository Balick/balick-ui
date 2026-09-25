import { ArrowRight, Github, Linkedin, Triangle, Twitter, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Customers", "Contact"] },
  { title: "Resources", links: ["Documentation", "Guides", "API reference", "Community", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
]

const socials = [
  { name: "GitHub", icon: Github },
  { name: "X", icon: Twitter },
  { name: "LinkedIn", icon: Linkedin },
  { name: "YouTube", icon: Youtube },
]

export function Footer01() {
  return (
    <footer className="relative overflow-hidden border-t">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex max-w-sm flex-col gap-6">
            <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
              <Triangle className="size-5 fill-current" />
              Acme
            </a>
            <p className="text-sm leading-6 text-muted-foreground">
              The platform for teams that ship. Subscribe to get product
              updates, once a month. No spam.
            </p>
            <form className="flex gap-2" action="#">
              <label htmlFor="footer-01-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-01-email"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
              />
              <Button type="submit" size="icon" aria-label="Subscribe" className="shrink-0">
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t py-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <span>© {new Date().getFullYear()} Acme, Inc.</span>
            <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </a>
          </div>
          <div className="flex items-center gap-1">
            {socials.map(({ name, icon: Icon }) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mx-auto max-w-6xl px-6 select-none"
      >
        <p className="-mb-[0.22em] bg-gradient-to-b from-foreground/15 to-transparent bg-clip-text text-center text-[clamp(5rem,22vw,16rem)] leading-none font-semibold tracking-tighter text-transparent">
          Acme
        </p>
      </div>
    </footer>
  )
}
