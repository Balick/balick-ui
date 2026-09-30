import { Typewriter } from "@/registry/balick/ui/typewriter"

export default function TypewriterDemo() {
  return (
    <p className="font-mono text-sm">
      <span className="text-muted-foreground select-none">$ </span>
      <Typewriter
        text={["npx shadcn@latest add @balick/hero-01", "npx shadcn@latest add @balick/pricing-01"]}
      />
    </p>
  )
}
