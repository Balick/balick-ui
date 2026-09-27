import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sheet flex-1 px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:px-0 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-12">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] overflow-y-auto border-r border-rule md:block">
        <DocsSidebar />
      </aside>
      <div className="min-w-0 md:pr-8 lg:pr-12">{children}</div>
    </div>
  )
}
