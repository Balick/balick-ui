import { HighlightText } from "@/registry/balick/ui/highlight-text"

export default function HighlightTextDemo() {
  return (
    <p className="max-w-sm text-center text-xl leading-9 font-medium tracking-tight text-balance">
      Every block shares the same primitives, so{" "}
      <HighlightText delay={0.3}>any combination looks like one page</HighlightText>.
    </p>
  )
}
