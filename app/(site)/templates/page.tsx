import type { Metadata } from "next"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Templates",
  description: "Full pages assembled from Balick UI blocks.",
}

export default function TemplatesPage() {
  return (
    <ComingSoon
      label="Coming soon"
      title="Templates"
      description="Full landing pages and sites assembled from blocks. Install, customise, deploy."
      items={["SaaS landing", "Portfolio", "Startup", "Waitlist", "Changelog"]}
    />
  )
}
