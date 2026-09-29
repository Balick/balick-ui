import { DocsNavTree } from "@/components/docs-nav-tree"

export function DocsSidebar() {
  return (
    <div className="px-3 py-8 lg:px-4">
      <DocsNavTree />
    </div>
  )
}

export function NewBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-1.5 py-px font-mono text-[10px] leading-4 text-muted-foreground">
      {children}
    </span>
  )
}
