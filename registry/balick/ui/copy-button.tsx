"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CopyButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "value" | "onClick" | "children"> {
  /** Text written to the clipboard. */
  value: string
  /** Called once the text is copied. */
  onCopy?: () => void
  /** How long the check mark stays, in milliseconds. */
  timeout?: number
  /** Accessible name of the button. */
  label?: string
}

async function writeText(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  // Older browsers and insecure contexts: copy through a hidden textarea.
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  textarea.remove()
}

/** Copies a text to the clipboard; the icon turns into a check mark. */
export function CopyButton({
  value,
  onCopy,
  timeout = 2000,
  label = "Copy",
  variant = "ghost",
  size = "icon",
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), timeout)
    return () => clearTimeout(timer)
  }, [copied, timeout])

  async function copy() {
    try {
      await writeText(value)
      setCopied(true)
      onCopy?.()
    } catch {
      setCopied(false)
    }
  }

  const icon = "absolute transition-all duration-200 motion-reduce:transition-none"

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={label}
      onClick={copy}
      className={cn("relative cursor-pointer", className)}
      {...props}
    >
      <Copy aria-hidden className={cn(icon, copied ? "scale-50 opacity-0" : "scale-100 opacity-100")} />
      <Check aria-hidden className={cn(icon, copied ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </Button>
  )
}
