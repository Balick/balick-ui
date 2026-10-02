import { RetroGrid } from "@/registry/balick/ui/retro-grid"

export default function RetroGridDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 bg-linear-to-b from-foreground to-foreground/40 bg-clip-text pb-2 text-5xl font-semibold tracking-tighter text-transparent">
        Retro Grid
      </p>
      <RetroGrid />
    </div>
  )
}
