import { Marquee } from "@/registry/balick/ui/marquee"

const reviews = [
  { name: "Lina", handle: "@lina", body: "Dropped it into our landing page in two minutes." },
  { name: "Marc", handle: "@marc", body: "Finally a component library that stays out of the way." },
  { name: "Sofia", handle: "@sofia", body: "The details are what sell it. Clean and quiet." },
  { name: "Noah", handle: "@noah", body: "Works with my existing shadcn setup, no friction." },
  { name: "Yara", handle: "@yara", body: "Motion that feels intentional, not decorative." },
  { name: "Tom", handle: "@tom", body: "The CLI install is the killer feature for me." },
]

function ReviewCard({ name, handle, body }: (typeof reviews)[number]) {
  return (
    <figure className="w-64 rounded-xl border bg-background p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
          {name[0]}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium">{name}</figcaption>
          <p className="text-xs text-muted-foreground">{handle}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-muted-foreground">{body}</blockquote>
    </figure>
  )
}

export default function MarqueeDemo() {
  const half = Math.ceil(reviews.length / 2)
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <Marquee pauseOnHover fade duration="30s">
        {reviews.slice(0, half).map((review) => (
          <ReviewCard key={review.handle} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover fade duration="30s">
        {reviews.slice(half).map((review) => (
          <ReviewCard key={review.handle} {...review} />
        ))}
      </Marquee>
    </div>
  )
}
