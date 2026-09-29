import type * as React from "react"

import { About01 } from "@/registry/balick/blocks/about-01/about-01"
import { Blog01 } from "@/registry/balick/blocks/blog-01/blog-01"
import { Contact01 } from "@/registry/balick/blocks/contact-01/contact-01"
import { Contact02 } from "@/registry/balick/blocks/contact-02/contact-02"
import { Cta01 } from "@/registry/balick/blocks/cta-01/cta-01"
import { Faq01 } from "@/registry/balick/blocks/faq-01/faq-01"
import { Features01 } from "@/registry/balick/blocks/features-01/features-01"
import { Features02 } from "@/registry/balick/blocks/features-02/features-02"
import { Footer01 } from "@/registry/balick/blocks/footer-01/footer-01"
import { Footer02 } from "@/registry/balick/blocks/footer-02/footer-02"
import { Hero01 } from "@/registry/balick/blocks/hero-01/hero-01"
import { Hero02 } from "@/registry/balick/blocks/hero-02/hero-02"
import { Hero03 } from "@/registry/balick/blocks/hero-03/hero-03"
import { Integrations01 } from "@/registry/balick/blocks/integrations-01/integrations-01"
import { Logos01 } from "@/registry/balick/blocks/logos-01/logos-01"
import { Navbar01 } from "@/registry/balick/blocks/navbar-01/navbar-01"
import { Newsletter01 } from "@/registry/balick/blocks/newsletter-01/newsletter-01"
import { Pricing01 } from "@/registry/balick/blocks/pricing-01/pricing-01"
import { Pricing02 } from "@/registry/balick/blocks/pricing-02/pricing-02"
import { Pricing03 } from "@/registry/balick/blocks/pricing-03/pricing-03"
import { Projects01 } from "@/registry/balick/blocks/projects-01/projects-01"
import { Services01 } from "@/registry/balick/blocks/services-01/services-01"
import { Stats01 } from "@/registry/balick/blocks/stats-01/stats-01"
import { Steps01 } from "@/registry/balick/blocks/steps-01/steps-01"
import { Team01 } from "@/registry/balick/blocks/team-01/team-01"
import { Testimonials01 } from "@/registry/balick/blocks/testimonials-01/testimonials-01"
import { Timeline01 } from "@/registry/balick/blocks/timeline-01/timeline-01"
import AnimatedNumberDemo from "@/registry/balick/examples/animated-number-demo"
import BlurFadeDemo from "@/registry/balick/examples/blur-fade-demo"
import GridPatternDemo from "@/registry/balick/examples/grid-pattern-demo"
import MarqueeDemo from "@/registry/balick/examples/marquee-demo"
import NumberTickerDemo from "@/registry/balick/examples/number-ticker-demo"
import SectionDemo from "@/registry/balick/examples/section-demo"
import SegmentedControlDemo from "@/registry/balick/examples/segmented-control-demo"
import ShimmerButtonDemo from "@/registry/balick/examples/shimmer-button-demo"
import SocialIconsDemo from "@/registry/balick/examples/social-icons-demo"
import StatusDotDemo from "@/registry/balick/examples/status-dot-demo"

/** Demo components rendered by <ComponentPreview />, keyed by registry item name. */
export const examples: Record<string, React.ComponentType> = {
  "animated-number-demo": AnimatedNumberDemo,
  "blur-fade-demo": BlurFadeDemo,
  "grid-pattern-demo": GridPatternDemo,
  "marquee-demo": MarqueeDemo,
  "number-ticker-demo": NumberTickerDemo,
  "section-demo": SectionDemo,
  "segmented-control-demo": SegmentedControlDemo,
  "shimmer-button-demo": ShimmerButtonDemo,
  "social-icons-demo": SocialIconsDemo,
  "status-dot-demo": StatusDotDemo,
}

/** Blocks rendered on their own at /view/[name], keyed by registry item name. */
export const blocks: Record<string, React.ComponentType> = {
  "navbar-01": Navbar01,
  "hero-01": Hero01,
  "hero-02": Hero02,
  "hero-03": Hero03,
  "logos-01": Logos01,
  "stats-01": Stats01,
  "about-01": About01,
  "timeline-01": Timeline01,
  "services-01": Services01,
  "features-01": Features01,
  "features-02": Features02,
  "steps-01": Steps01,
  "integrations-01": Integrations01,
  "projects-01": Projects01,
  "testimonials-01": Testimonials01,
  "team-01": Team01,
  "pricing-01": Pricing01,
  "pricing-02": Pricing02,
  "pricing-03": Pricing03,
  "faq-01": Faq01,
  "blog-01": Blog01,
  "newsletter-01": Newsletter01,
  "cta-01": Cta01,
  "contact-01": Contact01,
  "contact-02": Contact02,
  "footer-01": Footer01,
  "footer-02": Footer02,
}
