import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col overflow-x-clip">{children}</main>
      <SiteFooter />
    </div>
  )
}
