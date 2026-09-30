import { ScrambleText } from "@/registry/balick/ui/scramble-text"

export default function ScrambleTextDemo() {
  return (
    <ScrambleText
      text="SYSTEMS NOMINAL"
      scrambleOnHover
      className="font-mono text-xl tracking-widest sm:text-2xl"
    />
  )
}
