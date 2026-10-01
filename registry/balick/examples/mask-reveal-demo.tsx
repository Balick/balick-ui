import { MaskReveal } from "@/registry/balick/ui/mask-reveal"

export default function MaskRevealDemo() {
  return (
    <MaskReveal direction="left" zoom className="rounded-xl">
      <div className="flex h-44 w-72 flex-col justify-end bg-[linear-gradient(135deg,var(--foreground),color-mix(in_oklab,var(--foreground)_55%,var(--background)))] p-5 text-background">
        <p className="font-mono text-[10px] tracking-wider uppercase opacity-70">Plate 01</p>
        <p className="text-2xl font-semibold tracking-tight">Uncovered, not faded.</p>
      </div>
    </MaskReveal>
  )
}
