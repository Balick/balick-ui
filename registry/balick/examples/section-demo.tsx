import { Section, SectionHeader } from "@/registry/balick/ui/section"

export default function SectionDemo() {
  return (
    <Section spacing="compact" width="narrow">
      <SectionHeader
        eyebrow="Changelog"
        title="Shipped this week."
        description="Every block uses the same header, container and vertical rhythm, so sections always line up."
      />
    </Section>
  )
}
