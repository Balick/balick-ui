import { TiltCard } from "@/registry/balick/ui/tilt-card"

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-64 rounded-2xl border bg-card p-5 shadow-sm">
      <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Membership</p>
      <p className="mt-6 text-2xl font-semibold tracking-tight">Balick UI</p>
      <p className="mt-1 text-sm text-muted-foreground">Move the pointer over the card.</p>
      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>No. 0001</span>
        <span>Open source</span>
      </div>
    </TiltCard>
  )
}
