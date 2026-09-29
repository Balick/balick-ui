import { ExpandableText } from "@/registry/balick/ui/expandable-text"

export default function ExpandableTextDemo() {
  return (
    <ExpandableText lines={3} className="max-w-sm text-sm leading-6 text-muted-foreground">
      Balick UI started as the set of sections behind a handful of client sites. Every block
      is built on the same Section, Container and SectionHeader primitives, so a hero from
      one page and a pricing table from another still look like they belong together. The
      composer turns that into a workflow: pick the blocks, preview the page at any width,
      then install everything with a single command.
    </ExpandableText>
  )
}
