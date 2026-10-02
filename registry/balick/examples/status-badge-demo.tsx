import { StatusBadge } from "@/registry/balick/ui/status-badge"

const services = [
  { name: "Website", status: "operational" },
  { name: "API", status: "degraded" },
  { name: "Webhooks", status: "outage" },
  { name: "Dashboard", status: "maintenance" },
] as const

export default function StatusBadgeDemo() {
  return (
    <ul className="w-full max-w-64 divide-y rounded-xl border bg-card shadow-xs">
      {services.map((service) => (
        <li key={service.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
          <span className="text-sm font-medium">{service.name}</span>
          <StatusBadge status={service.status} />
        </li>
      ))}
    </ul>
  )
}
