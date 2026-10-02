import { Sparkline } from "@/registry/balick/ui/sparkline"
import { TrendBadge } from "@/registry/balick/ui/trend-badge"

const revenue = [31, 34, 33, 38, 36, 41, 39, 44, 43, 47, 45, 52, 50, 56]

export default function SparklineDemo() {
  return (
    <div className="w-full max-w-64 rounded-xl border bg-card p-4 shadow-xs">
      <p className="text-xs text-muted-foreground">Monthly revenue</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">$48,210</span>
        <TrendBadge value={12.4} />
      </div>
      <Sparkline data={revenue} aria-label="Revenue over the last 14 weeks, up" className="mt-4 h-14 w-full" />
    </div>
  )
}
