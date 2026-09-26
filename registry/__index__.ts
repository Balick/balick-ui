import type * as React from "react"

import { Features01 } from "@/registry/balick/blocks/features-01/features-01"
import { Footer01 } from "@/registry/balick/blocks/footer-01/footer-01"
import { Hero01 } from "@/registry/balick/blocks/hero-01/hero-01"
import { Navbar01 } from "@/registry/balick/blocks/navbar-01/navbar-01"
import { Pricing01 } from "@/registry/balick/blocks/pricing-01/pricing-01"
import BlurFadeDemo from "@/registry/balick/examples/blur-fade-demo"
import GridPatternDemo from "@/registry/balick/examples/grid-pattern-demo"
import MarqueeDemo from "@/registry/balick/examples/marquee-demo"
import SectionDemo from "@/registry/balick/examples/section-demo"
import ShimmerButtonDemo from "@/registry/balick/examples/shimmer-button-demo"

/** Demo components rendered by <ComponentPreview />, keyed by registry item name. */
export const examples: Record<string, React.ComponentType> = {
  "blur-fade-demo": BlurFadeDemo,
  "grid-pattern-demo": GridPatternDemo,
  "marquee-demo": MarqueeDemo,
  "section-demo": SectionDemo,
  "shimmer-button-demo": ShimmerButtonDemo,
}

/** Blocks rendered on their own at /view/[name], keyed by registry item name. */
export const blocks: Record<string, React.ComponentType> = {
  "navbar-01": Navbar01,
  "hero-01": Hero01,
  "features-01": Features01,
  "pricing-01": Pricing01,
  "footer-01": Footer01,
}
