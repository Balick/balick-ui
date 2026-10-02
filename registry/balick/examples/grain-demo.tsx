import { Grain } from "@/registry/balick/ui/grain"

export default function GrainDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <div className="relative flex aspect-[4/3] w-64 flex-col justify-end overflow-hidden rounded-2xl bg-foreground p-5 text-background">
        <Grain className="text-background opacity-25" />
        <p className="relative font-mono text-xs tracking-wider uppercase opacity-60">Issue 04</p>
        <p className="relative text-2xl font-semibold tracking-tighter">Paper and ink</p>
      </div>
    </div>
  )
}
