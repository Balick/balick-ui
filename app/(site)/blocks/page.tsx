import type { Metadata } from "next"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Complete, responsive sections built with Balick UI components.",
}

export default function BlocksPage() {
  return (
    <ComingSoon
      label="Coming soon"
      title="Blocks"
      description="Complete, responsive sections you can drop into any page. Built from Balick UI components."
      items={["Hero", "Features", "Pricing", "Testimonials", "Call to action", "FAQ", "Footer", "Authentication"]}
    />
  )
}
