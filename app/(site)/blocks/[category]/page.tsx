import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { BlockViewer } from "@/components/block-viewer"
import { BlocksCategoryTabs } from "@/components/blocks-category-tabs"
import { Row, Spacer } from "@/components/sheet"
import { CodeBlock } from "@/components/code-block"
import { installTarget } from "@/config/site"
import { blockList } from "@/content/blocks"
import { galleryCategories, galleryTabs } from "@/lib/blocks-gallery"
import { shadcnAdd } from "@/lib/commands"
import { getRegistryFiles, getRegistryItem } from "@/lib/registry"

type Props = { params: Promise<{ category: string }> }

function getGalleryCategory(slug: string) {
  return galleryCategories().find((category) => category.slug === slug)
}

/** Turns "https://…/r/marquee.json" into "marquee", and keeps shadcn names as is. */
function dependencyName(dependency: string) {
  return dependency.split("/").pop()!.replace(/\.json$/, "")
}

export const dynamicParams = false

export function generateStaticParams() {
  return galleryCategories().map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getGalleryCategory((await params).category)
  if (!category) return {}
  return {
    title: `${category.title} blocks`,
    description: `${category.description} Built for shadcn/ui and Tailwind CSS, installable with one command.`,
    alternates: { canonical: `/blocks/${category.slug}` },
  }
}

export default async function BlockCategoryPage({ params }: Props) {
  const category = getGalleryCategory((await params).category)
  if (!category) notFound()

  const blocks = await Promise.all(
    category.blocks.map(async (block) => {
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
  )

  return (
    <>
      <div className="sheet">
        <Spacer className="h-12 sm:h-16" />
        <Row>
          <nav aria-label="Breadcrumb" className="px-4 py-3 md:px-6">
            <ol className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              <li>
                <Link href="/blocks" className="transition-colors hover:text-foreground">
                  Blocks
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3" />
              </li>
              <li aria-current="page" className="text-foreground">
                {category.title}
              </li>
            </ol>
          </nav>
        </Row>
        <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
          <Row as="span" className="px-4 py-2 md:px-6">
            {category.title} blocks
          </Row>
        </h1>
        <Row bottom={false}>
          <p className="max-w-2xl px-4 py-3 text-lg text-balance text-muted-foreground md:px-6">
            {category.description}
          </p>
        </Row>
      </div>

      <BlocksCategoryTabs categories={galleryTabs()} active={category.slug} total={blockList.length} />

      <div className="sheet flex flex-col gap-16 px-4 py-12 md:px-6 md:py-16">
        {blocks.map((block) => (
          <BlockViewer
            key={block.name}
            name={block.name}
            title={block.title}
            description={block.description}
            commands={shadcnAdd(installTarget(block.name))}
            dependencies={block.dependencies}
            files={block.files}
          />
        ))}
      </div>
    </>
  )
}
