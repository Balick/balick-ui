import { DocsPager } from "@/components/docs-pager"
import { Toc, type TocItem } from "@/components/toc"
import { cn } from "@/lib/utils"

/**
 * Article column plus an optional table of contents on wide screens.
 * `tabs` is a sticky bar shown above the article, such as category tabs.
 * `wide` spreads the article over the whole column, without a table of
 * contents: for galleries of previews.
 */
export function DocsPage({
  href,
  toc = [],
  tabs,
  wide = false,
  children,
}: {
  href: string
  toc?: TocItem[]
  tabs?: React.ReactNode
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      {tabs}
      <div
        className={cn(
          "py-8 lg:py-12",
          !wide && "xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12"
        )}
      >
        <article className={cn("w-full min-w-0", !wide && "mx-auto max-w-3xl")}>
          {children}
          <DocsPager href={href} />
        </article>
        {!wide && (
          <aside className="hidden xl:block">
            <div className="sticky top-26">
              <Toc items={toc} />
            </div>
          </aside>
        )}
      </div>
    </>
  )
}
