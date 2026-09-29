import { CopyButton } from "@/registry/balick/ui/copy-button"

const command = "npx shadcn@latest add @balick/copy-button"

export default function CopyButtonDemo() {
  return (
    <div className="flex max-w-full items-center gap-2 rounded-lg border bg-background py-1 pr-1 pl-4 font-mono text-sm">
      <span className="truncate">{command}</span>
      <CopyButton value={command} label="Copy command" size="sm" className="size-8" />
    </div>
  )
}
