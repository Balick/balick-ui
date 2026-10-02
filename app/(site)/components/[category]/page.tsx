import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { fillerClasses, type GridBreakpoint } from "@/components/category-grid"
import { ComponentCategoryTabs } from "@/components/component-category-tabs"
import { CopyButton } from "@/components/copy-button"
import { ReplayPreview } from "@/components/replay-preview"
import { Row, Spacer } from "@/components/sheet"
import { installTarget } from "@/config/site"
import {
  categoryHref,
  componentCategories,
  componentDocs,
  componentHref,
  componentsByCategory,
  getComponentCategory,
  maxDescriptionLength,
} from "@/content/components"
import { cn } from "@/lib/utils"
import { examples } from "@/registry/__index__"

type Props = { params: Promise<{ category: string }> }

/** Columns of the preview grid: previews need more room than category cells. */
const previewBreakpoints: GridBreakpoint[] = [
  { columns: 1, show: "block", hide: "hidden" },
  { columns: 2, show: "sm:block", hide: "sm:hidden" },
  { columns: 3, show: "lg:block", hide: "lg:hidden" },
]

export const dynamicParams = false

export function generateStaticParams() {
  // A category and a component must never share a slug: both sit under /components.
  const clash = componentDocs.find((doc) => componentCategories.some((c) => c.slug === doc.slug))
  if (clash) throw new Error(`Component "${clash.slug}" has the same slug as a category`)
  const long = componentDocs.find((doc) => doc.description.length > maxDescriptionLength)
  if (long) {
    throw new Error(
      `The description of "${long.slug}" has ${long.description.length} characters: keep it to ${maxDescriptionLength} so its card stays on two lines`
    )
  }
  return componentsByCategory().map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getComponentCategory((await params).category)
  if (!category) return {}
  return {
    title: `${category.title} components`,
    description: `${category.description} Built for shadcn/ui and Tailwind CSS, installable with one command.`,
    alternates: { canonical: categoryHref(category.slug) },
  }
}

export default async function ComponentCategoryPage({ params }: Props) {
  const category = getComponentCategory((await params).category)
  if (!category) notFound()

  return (
    <>
      <div className="sheet">
        <Spacer className="h-12 sm:h-16" />
        <Row>
          <nav aria-label="Breadcrumb" className="px-4 py-3 md:px-6">
            <ol className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              <li>
                <Link href="/components" className="transition-colors hover:text-foreground">
                  Components
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
            {category.title}
          </Row>
        </h1>
        <Row bottom={false}>
          <p className="max-w-2xl px-4 py-3 text-lg text-balance text-muted-foreground md:px-6">
            {category.description}
          </p>
        </Row>
      </div>

      <ComponentCategoryTabs active={category.slug} />

      <div className="sheet">
        <Spacer className="h-8 sm:h-10" />
        <Row>
          {/* Live previews on a hairline grid: try each component right here. */}
          <div className="overflow-hidden">
            <ul className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {category.components.map((doc) => {
                const Example = examples[doc.example]
                const command = `npx shadcn@latest add ${installTarget(doc.slug)}`
                return (
                  <li key={doc.slug} id={doc.slug} className="flex flex-col border-r border-b border-rule">
                    <ReplayPreview
                      label={doc.title}
                      className="flex min-h-64 flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] px-6 py-12"
                    >
                      {Example && <Example />}
                    </ReplayPreview>
                    <div className="border-t border-rule p-4 md:px-6">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="min-w-0 truncate font-medium">
                          <Link href={componentHref(doc.slug)} className="underline-offset-4 hover:underline">
                            {doc.title}
                          </Link>
                        </h2>
                        <CopyButton
                          value={command}
                          aria-label={`Copy the install command of ${doc.title}`}
                          title={command}
                          className="-my-1 shrink-0"
                        />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground sm:min-h-12">{doc.description}</p>
                    </div>
                  </li>
                )
              })}
              {fillerClasses(category.components.length, previewBreakpoints).map((classes, index) => (
                <li key={index} aria-hidden className={cn("border-r border-b border-rule bg-hatch", classes)} />
              ))}
            </ul>
          </div>
        </Row>
        <Spacer className="h-16 sm:h-24" />
      </div>
    </>
  )
}
