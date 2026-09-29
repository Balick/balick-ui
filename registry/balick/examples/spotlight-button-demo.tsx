import { SpotlightButton } from "@/registry/balick/ui/spotlight-button"

export default function SpotlightButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SpotlightButton size="lg">Start building</SpotlightButton>
      <SpotlightButton size="lg" variant="outline">
        Talk to sales
      </SpotlightButton>
    </div>
  )
}
