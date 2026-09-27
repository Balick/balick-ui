import type { Metadata } from "next"

import { BlockViewer } from "@/components/block-viewer"
import { BlocksCategoryNav } from "@/components/blocks-category-nav"
import { CodeBlock } from "@/components/code-block"
import { registryUrl } from "@/config/site"
import { blockCategories, blockList } from "@/content/blocks"
import { shadcnAdd } from "@/lib/commands"
import { getRegistryFiles, getRegistryItem } from "@/lib/registry"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Complete, responsive sections built with Balick UI components. Preview, resize, copy.",
}

/** Turns "https://…/r/marquee.json" into "marquee", and keeps shadcn names as is. */
function dependencyName(dependency: string) {
  return dependency.split("/").pop()!.replace(/\.json$/, "")
}

export default async function BlocksPage() {
  const categories = await Promise.all(
    blockCategories.map(async (category) => ({
      ...category,
      blocks: await Promise.all(
        blockList
          .filter((block) => block.category === category.slug)
          .map(async (block) => {
            const item = getRegistryItem(block.name)
            const files = await getRegistryFiles(block.name)
            return {
              ...block,
              dependencies: [
                ...(item?.registryDependencies ?? []).map(dependencyName),
                ...(item?.dependencies ?? []),
              ],
              files: files.map((file) => ({
                path: file.path,
                code: <CodeBlock code={file.code} title={file.path} />,
              })),
            }
          })
      ),
    }))
  )

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
      <header className="relative -mx-4 overflow-hidden border-b px-4 py-16 md:-mx-6 md:px-6 md:py-20">
        <GridPattern className="[mask-image:radial-gradient(ellipse_50%_80%_at_0%_0%,white,transparent)]" />
        <div className="relative">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {blockList.length} blocks
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">Blocks</h1>
          <p className="mt-4 max-w-xl text-lg text-balance text-muted-foreground">
            Complete, responsive sections built with Balick UI components.
            Preview them at any width, then add them with one command.
          </p>
          <BlocksCategoryNav
            categories={categories.map(({ slug, title, blocks }) => ({
              slug,
              title,
              count: blocks.length,
            }))}
          />
        </div>
      </header>

      <div className="flex flex-col gap-20 py-16">
        {categories.map((category) => (
          <div key={category.slug} id={category.slug} className="scroll-mt-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold tracking-tight">
              {category.title}
              <span className="h-px flex-1 bg-border" />
            </h2>
            <div className="flex flex-col gap-16">
              {category.blocks.map((block) => (
                <BlockViewer
                  key={block.name}
                  name={block.name}
                  title={block.title}
                  description={block.description}
                  commands={shadcnAdd(registryUrl(block.name))}
                  dependencies={block.dependencies}
                  files={block.files}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
