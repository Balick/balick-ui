import { LightRays } from "@/registry/balick/ui/light-rays"

export default function LightRaysDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center gap-2 text-center">
        <p className="text-4xl font-semibold tracking-tighter">Light Rays</p>
        <p className="text-sm text-muted-foreground">Set the stage for what matters.</p>
      </div>
      <LightRays />
    </div>
  )
}
