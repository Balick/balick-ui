import { StatusBadge } from "@/registry/balick/ui/status-badge"
import { UptimeBar, type UptimeDay } from "@/registry/balick/ui/uptime-bar"

const incidents: Record<number, UptimeDay["status"]> = { 17: "degraded", 43: "down", 44: "degraded", 71: "degraded" }

const days: UptimeDay[] = Array.from({ length: 90 }, (_, index) => {
  const status = incidents[index] ?? "up"
  const ago = 89 - index
  const when = ago === 0 ? "Today" : ago === 1 ? "Yesterday" : `${ago} days ago`
  const what = { up: "no downtime", degraded: "degraded performance", down: "outage", none: "no data" }[status]
  return { status, label: `${when}: ${what}` }
})

export default function UptimeBarDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-xs">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">API</p>
          <p className="text-xs text-muted-foreground">api.balick.me</p>
        </div>
        <StatusBadge status="operational" />
      </div>
      <UptimeBar days={days} uptime="99.98%" />
    </div>
  )
}
