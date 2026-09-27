import type * as React from "react"

import { About01 } from "@/registry/balick/blocks/about-01/about-01"
import { Contact01 } from "@/registry/balick/blocks/contact-01/contact-01"
import { Cta01 } from "@/registry/balick/blocks/cta-01/cta-01"
import { Faq01 } from "@/registry/balick/blocks/faq-01/faq-01"
import { Features01 } from "@/registry/balick/blocks/features-01/features-01"
import { Features02 } from "@/registry/balick/blocks/features-02/features-02"
import { Footer01 } from "@/registry/balick/blocks/footer-01/footer-01"
import { Footer02 } from "@/registry/balick/blocks/footer-02/footer-02"
import { Hero01 } from "@/registry/balick/blocks/hero-01/hero-01"
import { Hero02 } from "@/registry/balick/blocks/hero-02/hero-02"
import { Hero03 } from "@/registry/balick/blocks/hero-03/hero-03"
import { Logos01 } from "@/registry/balick/blocks/logos-01/logos-01"
import { Navbar01 } from "@/registry/balick/blocks/navbar-01/navbar-01"
import { Pricing01 } from "@/registry/balick/blocks/pricing-01/pricing-01"
import { Pricing02 } from "@/registry/balick/blocks/pricing-02/pricing-02"
import { Projects01 } from "@/registry/balick/blocks/projects-01/projects-01"
import { Testimonials01 } from "@/registry/balick/blocks/testimonials-01/testimonials-01"
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
  "hero-02": Hero02,
  "hero-03": Hero03,
  "logos-01": Logos01,
  "about-01": About01,
  "features-01": Features01,
  "features-02": Features02,
  "projects-01": Projects01,
  "testimonials-01": Testimonials01,
  "pricing-01": Pricing01,
  "pricing-02": Pricing02,
  "faq-01": Faq01,
  "cta-01": Cta01,
  "contact-01": Contact01,
  "footer-01": Footer01,
  "footer-02": Footer02,
}
