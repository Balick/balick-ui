import { BlurFade } from "@/registry/balick/ui/blur-fade"

export default function BlurFadeDemo() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <BlurFade delay={0.1}>
        <p className="text-sm text-muted-foreground">Introducing</p>
      </BlurFade>
      <BlurFade delay={0.25}>
        <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
          Balick UI
        </h2>
      </BlurFade>
      <BlurFade delay={0.4}>
        <p className="max-w-xs text-muted-foreground">
          Components that feel as good as they look.
        </p>
      </BlurFade>
    </div>
  )
}
