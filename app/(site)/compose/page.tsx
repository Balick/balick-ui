import type { Metadata } from "next"

import { Composer } from "@/components/composer/composer"
import { parseComposition, starterComposition } from "@/lib/compose"

export const metadata: Metadata = {
  title: "Composer",
  description:
    "Pick Balick UI blocks, arrange them into a page, preview it at any width and install it with one command.",
}

export default async function ComposePage({
  searchParams,
}: {
  searchParams: Promise<{ blocks?: string }>
}) {
  const { blocks } = await searchParams
  // No parameter: first visit, start from a complete page. An empty
  // parameter is an intentionally empty composition.
  const initialBlocks = blocks === undefined ? starterComposition : parseComposition(blocks)

  return <Composer initialBlocks={initialBlocks} />
}
