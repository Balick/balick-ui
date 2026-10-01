import { Heart, Sparkles, Zap } from "lucide-react"

import { Float } from "@/registry/balick/ui/float"

const chips = [
  { icon: Sparkles, label: "Polished", className: "left-0 top-2", delay: "0s", duration: "5s" },
  { icon: Zap, label: "Fast", className: "right-0 top-16", delay: "-2s", duration: "6.5s" },
  { icon: Heart, label: "Loved", className: "left-10 bottom-0", delay: "-4s", duration: "5.5s" },
]

export default function FloatDemo() {
  return (
    <div className="relative h-44 w-64">
      {chips.map(({ icon: Icon, label, className, delay, duration }) => (
        <Float key={label} delay={delay} duration={duration} className={`absolute ${className}`}>
          <div className="flex items-center gap-2 rounded-full border bg-card px-3.5 py-2 text-sm font-medium shadow-xs">
            <Icon className="size-4 text-muted-foreground" />
            {label}
          </div>
        </Float>
      ))}
    </div>
  )
}
