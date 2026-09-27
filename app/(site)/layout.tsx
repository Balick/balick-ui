import { Rails } from "@/components/sheet"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    // Rules run edge to edge; clipping keeps them from widening the page.
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Rails />
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
