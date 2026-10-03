import { Gauge } from "@/registry/balick/ui/gauge"

const usage = [
  { label: "Build minutes", value: 42 },
  { label: "Bandwidth", value: 76 },
  { label: "Edge requests", value: 94 },
]

export default function GaugeDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {usage.map((item) => (
        <figure key={item.label} className="flex flex-col items-center gap-2">
          <Gauge value={item.value} aria-label={item.label} className="size-20" />
          <figcaption className="text-xs text-muted-foreground">{item.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
