"use client"

import * as React from "react"

import { COMPOSE_MESSAGE, compositionIds, splitComposition } from "@/lib/compose"
import { blocks as registryBlocks } from "@/registry/__index__"

/**
 * Renders a composition inside the composer's preview iframe. The composer
 * sends the updated block list with postMessage, so edits apply without
 * reloading the page.
 */
export function ComposeCanvas({ initialBlocks }: { initialBlocks: string[] }) {
  const [blocks, setBlocks] = React.useState(initialBlocks)
  // A new object per request, so focusing the same block twice scrolls again.
  const [focus, setFocus] = React.useState<{ index: number } | null>(null)

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== window.parent ||
        event.data?.type !== COMPOSE_MESSAGE
      ) {
        return
      }
      const next: unknown = event.data.blocks
      if (Array.isArray(next)) {
        setBlocks(next.filter((name): name is string => name in registryBlocks))
      }
      setFocus(typeof event.data.focus === "number" ? { index: event.data.focus } : null)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  React.useEffect(() => {
    if (focus === null) return
    // Wrappers use display: contents (so sticky navbars keep working), so
    // scroll to the block itself.
    document
      .querySelector(`[data-compose-index="${focus.index}"]`)
      ?.firstElementChild?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [focus, blocks])

  if (!blocks.length) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-center">
        <div>
          <p className="font-medium">Your page is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add sections from the panel to start composing.
          </p>
        </div>
      </div>
    )
  }

  // Mirror the installed page: same <main> landmark and the same ids.
  const ids = compositionIds(blocks)
  const { before, content } = splitComposition(blocks)
  const render = (name: string, index: number) => {
    const Block = registryBlocks[name] as React.ComponentType<{ id?: string }>
    return (
      <div key={`${index}-${name}`} data-compose-index={index} className="contents">
        <Block id={ids[index]} />
      </div>
    )
  }
  const main = before.length
  const end = before.length + content.length

  return (
    <>
      {blocks.slice(0, main).map((name, i) => render(name, i))}
      {content.length > 0 && (
        <main>
          {blocks.slice(main, end).map((name, i) => render(name, main + i))}
        </main>
      )}
      {blocks.slice(end).map((name, i) => render(name, end + i))}
    </>
  )
}
