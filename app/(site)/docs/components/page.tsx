import type { Metadata } from "next"
import Link from "next/link"

import { DocsHeader } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { NewBadge } from "@/components/docs-sidebar"
import { componentDocs } from "@/content/components"
import { examples } from "@/registry/__index__"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Balick UI component, with a live preview.",
}

export default function ComponentsPage() {
  return (
    <DocsPage href="/docs/components">
      <DocsHeader
        crumbs={[{ title: "Docs", href: "/docs" }, { title: "Components" }]}
        title="Components"
        description="Animated and original components. Preview them live, then add them with a single command."
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {componentDocs.map((doc) => {
          const Example = examples[doc.example]
          return (
            <Link
              key={doc.slug}
              href={`/docs/components/${doc.slug}`}
              className="group overflow-hidden rounded-xl border bg-card shadow-xs transition-colors hover:border-foreground/20"
            >
              <div
                inert
                className="pointer-events-none relative flex h-52 items-center justify-center overflow-hidden border-b bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-4"
              >
                <div className="flex w-full origin-center scale-[0.8] items-center justify-center">
                  {Example && <Example />}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{doc.title}</h2>
                  {doc.isNew && <NewBadge>New</NewBadge>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </DocsPage>
  )
}
