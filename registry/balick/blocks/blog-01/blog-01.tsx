import { ArrowRight, BookOpen, Gauge, Layers } from "lucide-react"

import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "Blog",
  title: "Notes from the team.",
  description: "Product updates, engineering deep dives and lessons learned along the way.",
}

const all = { label: "View all posts", href: "#" }

const posts = [
  {
    title: "How we cut cold starts by 80%",
    excerpt: "A look at the caching and bundling changes behind our fastest release yet.",
    category: "Engineering",
    date: "2026-09-12",
    readingTime: "8 min read",
    author: "David Chen",
    icon: Gauge,
    href: "#",
  },
  {
    title: "Designing a system that scales with the team",
    excerpt: "Tokens, primitives and the rules that keep forty screens looking like one product.",
    category: "Design",
    date: "2026-08-28",
    readingTime: "6 min read",
    author: "Amara Okafor",
    icon: Layers,
    href: "#",
  },
  {
    title: "What we learned from a thousand customer calls",
    excerpt: "The questions people ask before they buy, and how they reshaped our roadmap.",
    category: "Company",
    date: "2026-08-03",
    readingTime: "5 min read",
    author: "Claire Martin",
    icon: BookOpen,
    href: "#",
  },
]

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function Blog01({ id = "blog" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader {...header} align="left" />
        <a
          href={all.href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium"
        >
          {all.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <ul className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map(({ icon: Icon, ...post }) => (
          <li key={post.title}>
            <a
              href={post.href}
              className="group flex h-full flex-col rounded-xl border p-2 transition-colors hover:bg-muted/30"
            >
              {/* Replace with a cover image: <img src="..." alt="" className="aspect-[16/10] w-full rounded-lg object-cover" /> */}
              <div
                aria-hidden
                className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border bg-muted/40 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px]"
              >
                <span className="flex size-14 items-center justify-center rounded-xl border bg-background shadow-sm transition-transform group-hover:-translate-y-0.5">
                  <Icon className="size-6" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                  <span className="font-mono tracking-wider uppercase">{post.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h3 className="mt-3 font-medium text-balance">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <p className="mt-6 text-xs text-muted-foreground">
                  {post.author} · {post.readingTime}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
