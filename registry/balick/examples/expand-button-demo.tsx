import { Star } from "lucide-react"

import { ExpandButton } from "@/registry/balick/ui/expand-button"

export default function ExpandButtonDemo() {
  return <ExpandButton icon={<Star aria-hidden />} label="Star on GitHub" />
}
