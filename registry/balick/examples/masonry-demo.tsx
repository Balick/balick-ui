import { Masonry } from "@/registry/balick/ui/masonry"

const notes = [
  { title: "Moodboard", height: "h-28" },
  { title: "Typography", height: "h-16" },
  { title: "Palette", height: "h-32" },
  { title: "Wireframes", height: "h-20" },
  { title: "Motion", height: "h-24" },
  { title: "Handoff", height: "h-14" },
]

export default function MasonryDemo() {
  return (
    <Masonry className="w-full max-w-2xl columns-2 @lg/masonry:columns-3" gap="0.75rem">
      {notes.map(({ title, height }, index) => (
        <figure key={title} className="overflow-hidden rounded-xl border bg-card">
          <div
            className={`${height} bg-muted`}
            style={{
              backgroundImage: `linear-gradient(${120 + index * 30}deg, transparent, color-mix(in oklab, var(--color-foreground) ${6 + (index % 3) * 5}%, transparent))`,
            }}
          />
          <figcaption className="px-3 py-2 text-xs font-medium">{title}</figcaption>
        </figure>
      ))}
    </Masonry>
  )
}
