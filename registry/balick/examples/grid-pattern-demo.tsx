import { GridPattern } from "@/registry/balick/components/grid-pattern"

export default function GridPatternDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 text-4xl font-semibold tracking-tighter">Grid Pattern</p>
      <GridPattern
        squares={[
          [4, 4], [5, 1], [8, 2], [5, 3], [10, 10], [12, 6], [15, 5], [6, 7], [11, 3],
        ]}
        className="[mask-image:radial-gradient(360px_circle_at_center,white,transparent)]"
      />
    </div>
  )
}
