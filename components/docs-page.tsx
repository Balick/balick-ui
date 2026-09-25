import { DocsPager } from "@/components/docs-pager"
import { Toc, type TocItem } from "@/components/toc"

/** Article column plus an optional table of contents on wide screens. */
export function DocsPage({
  href,
  toc = [],
  children,
}: {
  href: string
  toc?: TocItem[]
  children: React.ReactNode
}) {
  return (
    <div className="py-8 lg:py-12 xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
      <article className="mx-auto w-full max-w-3xl min-w-0">
        {children}
        <DocsPager href={href} />
      </article>
      <aside className="hidden xl:block">
        <div className="sticky top-26">
          <Toc items={toc} />
        </div>
      </aside>
    </div>
  )
}
