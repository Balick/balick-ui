import { WaveLines } from "@/registry/balick/ui/wave-lines"

export default function WaveLinesDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
        Wave Lines
      </p>
      <WaveLines className="[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
    </div>
  )
}
