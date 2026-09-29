import { DocsPager } from "@/components/docs-pager"
import { Toc, type TocItem } from "@/components/toc"

/**
 * Article column plus an optional table of contents on wide screens.
 * `tabs` is a sticky bar shown above the article, such as category tabs.
 */
export function DocsPage({
  href,
  toc = [],
  tabs,
  children,
}: {
  href: string
  toc?: TocItem[]
  tabs?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      {tabs}
      <div className="py-8 lg:py-12 xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
        <article className="mx-auto w-full max-w-3xl min-w-0">
          {children}
          <DocsPager href={href} />
        </article>
        <aside className="hidden xl:block">
          <div className={tabs ? "sticky top-32" : "sticky top-26"}>
            <Toc items={toc} />
          </div>
        </aside>
      </div>
    </>
  )
}
