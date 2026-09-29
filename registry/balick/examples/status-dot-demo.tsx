import { StatusDot } from "@/registry/balick/ui/status-dot"

const statuses = [
  { tone: "success", label: "All systems operational", pulse: true },
  { tone: "warning", label: "Degraded performance", pulse: true },
  { tone: "danger", label: "Partial outage", pulse: true },
  { tone: "neutral", label: "Maintenance scheduled", pulse: false },
] as const

export default function StatusDotDemo() {
  return (
    <ul className="flex flex-col gap-3 text-sm">
      {statuses.map((status) => (
        <li key={status.tone} className="flex items-center gap-2.5">
          <StatusDot tone={status.tone} pulse={status.pulse} />
          {status.label}
        </li>
      ))}
    </ul>
  )
}
