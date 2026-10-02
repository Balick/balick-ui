import { InteractiveGrid } from "@/registry/balick/ui/interactive-grid"

export default function InteractiveGridDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 text-4xl font-semibold tracking-tighter">Move your pointer</p>
      <InteractiveGrid className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />
    </div>
  )
}
