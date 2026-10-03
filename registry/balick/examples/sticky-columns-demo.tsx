import { StickyColumns } from "@/registry/balick/ui/sticky-columns"

const steps = [
  { title: "Plan", text: "Turn ideas into issues, sorted by what matters this week." },
  { title: "Build", text: "Branches, reviews and previews, linked to the issue they close." },
  { title: "Ship", text: "Release when checks are green, with notes written for you." },
  { title: "Learn", text: "See how each release lands, and feed it back into the plan." },
]

export default function StickyColumnsDemo() {
  return (
    <div className="h-80 w-full max-w-2xl overflow-y-auto rounded-xl border bg-background p-6">
      <StickyColumns
        top="0rem"
        aside={
          <div>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Workflow</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tighter">Plan, build, ship.</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This column stays put while the steps scroll by.
            </p>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          {steps.map(({ title, text }, index) => (
            <div key={title} className="rounded-xl border bg-card p-5">
              <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
              <p className="mt-6 font-medium">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </StickyColumns>
    </div>
  )
}
