import type * as React from "react"

import BlurFadeDemo from "@/registry/balick/examples/blur-fade-demo"
import GridPatternDemo from "@/registry/balick/examples/grid-pattern-demo"
import MarqueeDemo from "@/registry/balick/examples/marquee-demo"
import ShimmerButtonDemo from "@/registry/balick/examples/shimmer-button-demo"

/** Demo components rendered by <ComponentPreview />, keyed by registry item name. */
export const examples: Record<string, React.ComponentType> = {
  "blur-fade-demo": BlurFadeDemo,
  "grid-pattern-demo": GridPatternDemo,
  "marquee-demo": MarqueeDemo,
  "shimmer-button-demo": ShimmerButtonDemo,
}
