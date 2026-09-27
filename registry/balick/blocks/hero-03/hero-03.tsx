import { ArrowRight, Github, Linkedin, MapPin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/registry/balick/ui/blur-fade"
import { Marquee } from "@/registry/balick/ui/marquee"
import { Section } from "@/registry/balick/ui/section"

const person = {
  name: "Alex Morgan",
  status: "Available for new projects",
  title: "Frontend developer crafting fast, memorable interfaces.",
  description:
    "I design and build web products with a sharp eye for detail, from design systems to production-ready apps.",
  location: "Remote · Lisbon",
  primary: { label: "View projects", href: "#" },
  secondary: { label: "Get in touch", href: "#" },
}

const socials = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "X", icon: Twitter, href: "#" },
]

const stack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "Node.js", "Figma"]

export function Hero03({ id = "hero" }: { id?: string }) {
  return (
    <Section id={id} spacing="none">
      <div className="flex flex-col items-start pt-24 pb-16 sm:pt-32">
        <BlurFade>
          <p className="inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-2.5 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {person.status}
          </p>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="mt-8 font-mono text-sm text-muted-foreground">{person.name}</p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl">
            {person.title}
          </h1>
        </BlurFade>
        <BlurFade delay={0.25}>
          <p className="mt-6 max-w-xl text-lg text-balance text-muted-foreground">
            {person.description}
          </p>
        </BlurFade>
        <BlurFade delay={0.35} className="mt-10 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <a href={person.primary.href}>
              {person.primary.label}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={person.secondary.href}>{person.secondary.label}</a>
          </Button>
        </BlurFade>
        <BlurFade delay={0.45} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="-ml-2 flex items-center gap-1">
            {socials.map(({ name, icon: Icon, href }) => (
              <li key={name}>
                <a
                  href={href}
                  aria-label={name}
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden />
            {person.location}
          </p>
        </BlurFade>
      </div>
      <div className="border-t pt-8 pb-24 sm:pb-32">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Tools I work with
        </p>
        <Marquee fade duration="30s" gap="2.5rem" className="mt-4 -mx-2">
          {stack.map((tool) => (
            <span key={tool} className="text-lg font-medium whitespace-nowrap text-muted-foreground">
              {tool}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
