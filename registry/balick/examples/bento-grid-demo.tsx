import { BarChart3 } from "lucide-react"

import { BentoCard, BentoGrid } from "@/registry/balick/ui/bento-grid"

function Bars() {
  const heights = [40, 64, 48, 80, 56, 92, 72, 100]
  return (
    <div className="flex h-full items-end gap-2 px-6 pt-6 pb-20">
      {heights.map((height, index) => (
        <div
          key={index}
          className="flex-1 rounded-t-md bg-muted last:bg-foreground/80"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

function Alerts() {
  return (
    <div className="flex flex-col gap-2 px-4 pt-4">
      {["Deploy finished", "New sign-up"].map((text, index) => (
        <div
          key={text}
          className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs whitespace-nowrap shadow-xs"
          style={{ opacity: 1 - index * 0.35, scale: `${1 - index * 0.06}` }}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-foreground/60" />
          {text}
        </div>
      ))}
    </div>
  )
}

function Apps() {
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="aspect-square rounded-lg border bg-muted/60" />
      ))}
    </div>
  )
}

export default function BentoGridDemo() {
  return (
    <BentoGrid className="w-full max-w-2xl auto-rows-[11rem] @xs/bento:grid-cols-2">
      <BentoCard
        className="@xs/bento:col-span-2"
        icon={<BarChart3 />}
        title="Analytics"
        description="Every visit, sign-up and sale, in one view."
        background={<Bars />}
        href="#"
      />
      <BentoCard title="Alerts" description="Know it as it happens." background={<Alerts />} href="#" />
      <BentoCard title="Integrations" description="Your tools, connected." background={<Apps />} href="#" />
    </BentoGrid>
  )
}
