
import { Section, SectionHeader } from "@/registry/balick/ui/section"
import { GitHubIcon, LinkedInIcon, XIcon } from "@/registry/balick/ui/social-icons"

const header = {
  eyebrow: "Team",
  title: "The people behind Acme.",
  description: "A small, senior team that has built and scaled products at companies you know.",
}

const members = [
  {
    name: "Claire Martin",
    role: "Co-founder, CEO",
    bio: "Previously led product at Northwind. Obsessed with fast feedback loops.",
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "David Chen",
    role: "Co-founder, CTO",
    bio: "Built the deploy pipeline at Lumen. Writes Rust for fun.",
    links: { github: "#", linkedin: "#" },
  },
  {
    name: "Amara Okafor",
    role: "Head of Design",
    bio: "Designed systems used by millions at Arcadia. Loves a good grid.",
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Leo Fischer",
    role: "Founding Engineer",
    bio: "Maintainer of two popular open-source tools. Performance nerd.",
    links: { github: "#", twitter: "#" },
  },
]

const socials = [
  { key: "github", label: "GitHub", icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedInIcon },
  { key: "twitter", label: "X", icon: XIcon },
] as const

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

export function Team01({ id = "team" }: { id?: string }) {
  return (
    <Section id={id}>
      <SectionHeader {...header} />
      <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.name} className="flex flex-col rounded-xl border bg-card p-6">
            {/* Replace with a photo: <img src="..." alt="" className="aspect-square w-full rounded-lg object-cover" /> */}
            <div
              aria-hidden
              className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted text-4xl font-semibold tracking-tighter text-muted-foreground"
            >
              {initials(member.name)}
            </div>
            <h3 className="mt-6 font-medium">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{member.bio}</p>
            <div className="mt-6 flex gap-1">
              {socials.map(({ key, label, icon: Icon }) => {
                const href = (member.links as Partial<Record<string, string>>)[key]
                return href ? (
                  <a
                    key={key}
                    href={href}
                    aria-label={`${member.name} on ${label}`}
                    className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                ) : null
              })}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
