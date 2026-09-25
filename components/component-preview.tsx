import { CodeBlock } from "@/components/code-block"
import { PreviewFrame } from "@/components/preview-frame"
import { getRegistrySource } from "@/lib/registry"
import { examples } from "@/registry/__index__"

export async function ComponentPreview({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Example = examples[name]
  const source = await getRegistrySource(name)
  if (!Example || !source) return null

  return (
    <PreviewFrame
      name={name}
      className={className}
      code={<CodeBlock code={source} collapsible />}
    >
      <Example />
    </PreviewFrame>
  )
}
