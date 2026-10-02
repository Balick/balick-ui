import { FlickeringGrid } from "@/registry/balick/ui/flickering-grid"

export default function FlickeringGridDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 text-4xl font-semibold tracking-tighter">Flickering Grid</p>
      <FlickeringGrid className="[mask-image:radial-gradient(360px_circle_at_center,white,transparent)]" />
    </div>
  )
}
