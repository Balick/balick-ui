import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 md:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] overflow-y-auto border-r md:block">
        <DocsSidebar />
      </aside>
      {children}
    </div>
  )
}
