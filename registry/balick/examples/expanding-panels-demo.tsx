import { Compass, PenTool, Rocket, Sprout } from "lucide-react"

import { ExpandingPanel, ExpandingPanels } from "@/registry/balick/ui/expanding-panels"

function Rings() {
  return (
    <div className="absolute -top-10 -right-10 size-48">
      {[0, 1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute inset-0 rounded-full border"
          style={{ scale: `${1 - ring * 0.22}` }}
        />
      ))}
    </div>
  )
}

const panels = [
  { title: "Discover", icon: <Compass />, description: "Interviews, data and a clear problem statement." },
  { title: "Design", icon: <PenTool />, description: "Flows and prototypes, tested with real people." },
  { title: "Launch", icon: <Rocket />, description: "A staged rollout, watched closely for the first week." },
  { title: "Grow", icon: <Sprout />, description: "Iterate on what the numbers and the users say." },
]

export default function ExpandingPanelsDemo() {
  return (
    <ExpandingPanels className="h-80 w-full max-w-2xl">
      {panels.map((panel) => (
        <ExpandingPanel key={panel.title} {...panel} background={<Rings />} />
      ))}
    </ExpandingPanels>
  )
}
