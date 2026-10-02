import { TrendBadge } from "@/registry/balick/ui/trend-badge"

const metrics = [
  { name: "Revenue", value: "$48,210", change: 12.4 },
  { name: "Churn", value: "2.1%", change: -0.8, inverse: true },
  { name: "p95 latency", value: "184 ms", change: 6.2, inverse: true },
]

export default function TrendBadgeDemo() {
  return (
    <ul className="w-full max-w-64 divide-y rounded-xl border bg-card shadow-xs">
      {metrics.map((metric) => (
        <li key={metric.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
          <span className="text-sm text-muted-foreground">{metric.name}</span>
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium tabular-nums">{metric.value}</span>
            <TrendBadge value={metric.change} inverse={metric.inverse} />
          </span>
        </li>
      ))}
    </ul>
  )
}
