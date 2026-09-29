import { RippleButton } from "@/registry/balick/ui/ripple-button"

export default function RippleButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RippleButton>Click me</RippleButton>
      <RippleButton variant="outline">Or me</RippleButton>
    </div>
  )
}
