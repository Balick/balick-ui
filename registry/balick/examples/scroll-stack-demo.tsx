import { ScrollStack, ScrollStackItem } from "@/registry/balick/ui/scroll-stack"

const cards = [
  { title: "Collect", text: "Gather feedback from every channel in one inbox." },
  { title: "Sort", text: "Group it by theme, automatically, as it comes in." },
  { title: "Decide", text: "Weigh each theme by the customers behind it." },
  { title: "Close the loop", text: "Tell people when what they asked for ships." },
]

export default function ScrollStackDemo() {
  return (
    <div className="h-80 w-full max-w-md overflow-y-auto rounded-xl border bg-background px-4">
      <p className="py-6 text-center text-xs text-muted-foreground">Scroll down</p>
      <ScrollStack top="1rem" offset="2.25rem">
        {cards.map(({ title, text }, index) => (
          <ScrollStackItem key={title} className="flex h-40 flex-col justify-between px-5 pt-2.5 pb-5">
            <p className="font-mono text-xs text-muted-foreground">
              0{index + 1} / 0{cards.length}
            </p>
            <div>
              <p className="text-lg font-semibold tracking-tight">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
      <div className="h-40" />
    </div>
  )
}
