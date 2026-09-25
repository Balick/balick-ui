import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FrameHeightReporter } from "@/components/frame-height-reporter"
import { blockList, getBlock } from "@/content/blocks"
import { blocks } from "@/registry/__index__"

type Props = { params: Promise<{ name: string }> }

export function generateStaticParams() {
  return blockList.map((block) => ({ name: block.name }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const block = getBlock((await params).name)
  return block ? { title: block.title, robots: { index: false } } : {}
}

export default async function BlockViewPage({ params }: Props) {
  const { name } = await params
  const Block = blocks[name]
  if (!Block) notFound()

  return (
    <>
      <Block />
      <FrameHeightReporter />
    </>
  )
}
