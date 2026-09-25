"use client"

import * as React from "react"

export function useCopy(timeout = 1500) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), timeout)
    return () => clearTimeout(id)
  }, [copied, timeout])

  const copy = React.useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }, [])

  return { copied, copy }
}
