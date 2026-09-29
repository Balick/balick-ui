import { FileCode2 } from "lucide-react"

import { CollapsibleCode } from "@/components/collapsible-code"
import { CopyButton } from "@/components/copy-button"
import { highlight } from "@/lib/highlight"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  lang?: string
  title?: string
  /** Collapse long snippets behind an "Expand" button. */
  collapsible?: boolean
  className?: string
}

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  collapsible = false,
  className,
}: CodeBlockProps) {
  const html = await highlight(code.trim(), lang)
  const body = (
    <div
      className="scrollbar-thin overflow-x-auto p-4 font-mono text-[13px] leading-6 [&_pre]:outline-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
  const isLong = code.split("\n").length > 16

  return (
    <figure
      className={cn(
        "surface-code relative overflow-hidden rounded-lg shadow-xs",
        className
      )}
    >
      {title ? (
        <figcaption className="flex h-10 items-center gap-2 border-b pr-2 pl-4 font-mono text-xs text-muted-foreground">
          <FileCode2 className="size-3.5" />
          <span className="flex-1 truncate">{title}</span>
          <CopyButton value={code} />
        </figcaption>
      ) : (
        <CopyButton value={code} className="absolute top-2.5 right-2.5 z-10" />
      )}
      {collapsible && isLong ? <CollapsibleCode>{body}</CollapsibleCode> : body}
    </figure>
  )
}
