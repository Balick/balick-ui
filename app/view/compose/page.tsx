import type { Metadata } from "next"

import { ComposeCanvas } from "@/components/composer/compose-canvas"
import { FrameHeightReporter } from "@/components/frame-height-reporter"
import { parseComposition } from "@/lib/compose"

export const metadata: Metadata = {
  title: "Composed page",
  robots: { index: false },
}

export default async function ComposeViewPage({
  searchParams,
}: {
  searchParams: Promise<{ blocks?: string }>
}) {
  const { blocks } = await searchParams

  return (
    <>
      <ComposeCanvas initialBlocks={parseComposition(blocks)} />
      <FrameHeightReporter />
    </>
  )
}
