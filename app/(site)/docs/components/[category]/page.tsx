import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ComponentCategoryTabs } from "@/components/component-category-tabs"
import { CopyButton } from "@/components/copy-button"
import { DocsHeader } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { installTarget } from "@/config/site"
import {
  categoryHref,
  componentCategories,
  componentDocs,
  componentHref,
  componentsByCategory,
  getComponentCategory,
} from "@/content/components"
import { examples } from "@/registry/__index__"

type Props = { params: Promise<{ category: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  // Categories and components share /docs/components/<slug>: fail the build on a clash.
  const clash = componentDocs.find((doc) => componentCategories.some((c) => c.slug === doc.slug))
  if (clash) throw new Error(`Component "${clash.slug}" has the same slug as a category`)
  return componentsByCategory().map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getComponentCategory((await params).category)
  if (!category) return {}
  return {
    title: `${category.title} components`,
    description: `${category.description} Built for shadcn/ui and Tailwind CSS, installable with one command.`,
  }
}

export default async function ComponentCategoryPage({ params }: Props) {
  const category = getComponentCategory((await params).category)
  if (!category) notFound()

  return (
    <DocsPage
      href={categoryHref(category.slug)}
      tabs={<ComponentCategoryTabs active={category.slug} />}
      wide
    >
      <DocsHeader
        crumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Components", href: "/docs/components" },
          { title: category.title },
        ]}
        title={category.title}
        description={category.description}
      >
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          {category.components.length}{" "}
          {category.components.length === 1 ? "component" : "components"}
        </p>
      </DocsHeader>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {category.components.map((doc) => {
          const Example = examples[doc.example]
          const command = `npx shadcn@latest add ${installTarget(doc.slug)}`
          return (
            <section
              key={doc.slug}
              id={doc.slug}
              aria-labelledby={`${doc.slug}-title`}
              className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-xs"
            >
              {/* A live preview: try the component right here. */}
              <div className="relative flex min-h-56 flex-1 items-center justify-center overflow-hidden border-b bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] px-4 py-10">
                {Example && <Example />}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 id={`${doc.slug}-title`} className="min-w-0 truncate font-medium">
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
                <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
              </div>
            </section>
          )
        })}
      </div>
    </DocsPage>
  )
}
