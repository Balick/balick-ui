import { WordRotate } from "@/registry/balick/ui/word-rotate"

export default function WordRotateDemo() {
  return (
    <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
      Ship pages <WordRotate words={["faster", "calmer", "together"]} />
    </h2>
  )
}
