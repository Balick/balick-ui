import { Ripple } from "@/registry/balick/ui/ripple"

export default function RippleDemo() {
  return (
    <div className="relative flex size-full min-h-80 items-center justify-center overflow-hidden">
      <p className="z-10 text-4xl font-semibold tracking-tighter">Ripple</p>
      <Ripple />
    </div>
  )
}
