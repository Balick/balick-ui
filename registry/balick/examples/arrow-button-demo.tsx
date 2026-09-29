import { ArrowButton, ArrowLink } from "@/registry/balick/ui/arrow-button"

export default function ArrowButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ArrowButton>Get started</ArrowButton>
      <ArrowLink href="#" variant="outline">
        Read the docs
      </ArrowLink>
    </div>
  )
}
