import { Aurora } from "@/registry/balick/ui/aurora"

export default function AuroraDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 text-4xl font-semibold tracking-tighter">Aurora</p>
      <Aurora className="[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_20%,transparent)]" />
    </div>
  )
}
