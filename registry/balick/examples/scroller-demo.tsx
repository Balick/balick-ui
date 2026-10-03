import { Scroller } from "@/registry/balick/ui/scroller"

const posts = [
  "Designing quiet interfaces",
  "A grid for every page",
  "Motion that serves content",
  "Shipping a design system",
  "Dark mode, done right",
  "Writing for the web",
  "The case for monochrome",
]

export default function ScrollerDemo() {
  return (
    <Scroller controls aria-label="Latest posts" className="max-w-md">
      {posts.map((title, index) => (
        <article key={title} className="flex h-40 w-44 flex-col justify-between rounded-xl border bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">No. {String(index + 1).padStart(2, "0")}</p>
          <p className="text-sm font-medium text-balance">{title}</p>
        </article>
      ))}
    </Scroller>
  )
}
