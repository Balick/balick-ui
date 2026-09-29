import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CodeBlock } from "@/components/code-block"
import { CommandBlock } from "@/components/command-block"
import { ComponentPreview } from "@/components/component-preview"
import { DocsHeader, H2, InlineCode, P, Step, Steps } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { PropsTable } from "@/components/props-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { installTarget, registryUrl } from "@/config/site"
import {
  categoryHref,
  componentDocs,
  componentHref,
  getComponentCategory,
  getComponentDoc,
} from "@/content/components"
import { installDependencies, shadcnAdd } from "@/lib/commands"
import { getRegistryItem, getRegistrySource } from "@/lib/registry"

type Props = { params: Promise<{ category: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return componentDocs.map((doc) => ({ category: doc.category, slug: doc.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getComponentDoc((await params).slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description }
}

export default async function ComponentPage({ params }: Props) {
  const { category: categorySlug, slug } = await params
  const doc = getComponentDoc(slug)
  const category = getComponentCategory(categorySlug)
  const item = getRegistryItem(slug)
  const source = await getRegistrySource(slug)
  if (!doc || !category || doc.category !== category.slug || !item || !source) notFound()

  const dependencies = item.dependencies ?? []

  return (
    <DocsPage
      href={componentHref(slug)}
      toc={[
        { id: "installation", title: "Installation" },
        { id: "usage", title: "Usage" },
        { id: "props", title: "Props" },
      ]}
    >
      <DocsHeader
        crumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Components", href: "/docs/components" },
          { title: category.title, href: categoryHref(category.slug) },
          { title: doc.title },
        ]}
        title={doc.title}
        description={doc.description}
      >
        {dependencies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Dependencies</span>
            {dependencies.map((dep) => (
              <a
                key={dep}
                href={`https://www.npmjs.com/package/${dep}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border px-2 py-0.5 font-mono text-foreground transition-colors hover:bg-accent"
              >
                {dep}
              </a>
            ))}
          </div>
        )}
      </DocsHeader>

      <ComponentPreview name={doc.example} className="mt-8" />

      <H2 id="installation">Installation</H2>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="flex flex-col gap-3">
          <CommandBlock commands={shadcnAdd(installTarget(slug))} />
          <P className="text-sm">
            Or pass the full URL: <InlineCode>{registryUrl(slug)}</InlineCode>
          </P>
        </TabsContent>
        <TabsContent value="manual" className="pt-3">
          <Steps>
            {dependencies.length > 0 && (
              <Step title="Install the dependencies">
                <CommandBlock commands={installDependencies(dependencies)} />
              </Step>
            )}
            <Step title="Copy the source code">
              <CodeBlock code={source} title={`components/ui/${slug}.tsx`} collapsible />
            </Step>
            {doc.css && (
              <Step title="Add the animation to your global CSS">
                <CodeBlock code={doc.css} lang="css" title="app/globals.css" />
              </Step>
            )}
            <Step title="Update the import paths">
              <P className="mt-0">Make sure the imports match your project&apos;s aliases.</P>
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>

      <H2 id="usage">Usage</H2>
      <CodeBlock code={doc.usage} />

      <H2 id="props">Props</H2>
      <div className="flex flex-col gap-8">
        {(doc.propGroups ?? [{ title: "", props: doc.props ?? [] }]).map((group) => (
          <div key={group.title}>
            {group.title && (
              <h3 className="mb-3 font-mono text-sm font-medium">{`<${group.title} />`}</h3>
            )}
            <PropsTable props={group.props} />
          </div>
        ))}
      </div>
    </DocsPage>
  )
}
