import { Stagger } from "@/registry/balick/ui/stagger"

const people = [
  { name: "Lina Moreau", role: "Design" },
  { name: "Marc Dubois", role: "Engineering" },
  { name: "Sofia Rossi", role: "Product" },
  { name: "Noah Weber", role: "Support" },
]

export default function StaggerDemo() {
  return (
    <Stagger className="flex w-full max-w-xs flex-col gap-2" interval={0.1}>
      {people.map((person) => (
        <div key={person.name} className="flex items-center gap-3 rounded-lg border bg-card p-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
            {person.name[0]}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{person.name}</span>
            <span className="text-xs text-muted-foreground">{person.role}</span>
          </div>
        </div>
      ))}
    </Stagger>
  )
}
