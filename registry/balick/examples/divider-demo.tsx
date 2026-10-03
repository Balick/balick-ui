import { Sparkles } from "lucide-react"

import { Divider } from "@/registry/balick/ui/divider"

export default function DividerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      <Divider label="or" />
      <Divider label="Recent" align="start" variant="dashed" />
      <Divider label={<Sparkles />} variant="fade" />
      <div className="flex h-6 items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>Docs</span>
        <Divider orientation="vertical" />
        <span>Blog</span>
        <Divider orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  )
}
