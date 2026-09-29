import { TextRollButton } from "@/registry/balick/ui/text-roll-button"

export default function TextRollButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <TextRollButton>Book a demo</TextRollButton>
      <TextRollButton variant="outline">View pricing</TextRollButton>
    </div>
  )
}
