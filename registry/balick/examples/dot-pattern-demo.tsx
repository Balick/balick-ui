import { DotPattern } from "@/registry/balick/ui/dot-pattern"

export default function DotPatternDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 text-4xl font-semibold tracking-tighter">Dot Pattern</p>
      <DotPattern
        glow={[
          [4, 3], [9, 6], [14, 2], [18, 8], [6, 12], [12, 10], [21, 4], [16, 13], [2, 8], [24, 11],
        ]}
        className="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
      />
    </div>
  )
}
