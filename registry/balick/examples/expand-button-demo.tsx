import { Download, Share2, Star } from "lucide-react"

import { ExpandButton } from "@/registry/balick/ui/expand-button"

export default function ExpandButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <ExpandButton icon={<Star aria-hidden />} label="Star on GitHub" />
      <ExpandButton icon={<Share2 aria-hidden />} label="Share" />
      <ExpandButton icon={<Download aria-hidden />} label="Download" />
    </div>
  )
}
