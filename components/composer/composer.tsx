"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Check,
  ExternalLink,
  GripVertical,
  Link2,
  Lightbulb,
  Plus,
  X,
} from "lucide-react"
import { Reorder, useDragControls } from "motion/react"

import { InstallDialog } from "@/components/composer/install-dialog"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { ResizableFrame, ViewportToggle } from "@/components/resizable-frame"
import { blockCategories, blockList, getBlock, getCategory } from "@/content/blocks"
import { useCopy } from "@/hooks/use-copy"
import {
  COMPOSE_MESSAGE,
  composeRegistryUrl,
  compositionHints,
  insertionIndex,
  serializeComposition,
  starterComposition,
} from "@/lib/compose"
import { cn } from "@/lib/utils"

interface Item {
  id: number
  name: string
}

export function Composer({ initialBlocks }: { initialBlocks: string[] }) {
  const nextId = React.useRef(0)
  const toItems = React.useCallback(
    (names: string[]) => names.map((name) => ({ id: nextId.current++, name })),
    []
  )
  const [items, setItems] = React.useState<Item[]>(() => toItems(initialBlocks))
  const [width, setWidth] = React.useState<number | null>(null)
  const [src] = React.useState(
    () => `/view/compose?blocks=${serializeComposition(initialBlocks)}`
  )
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const ready = React.useRef(false)
  const pendingFocus = React.useRef<number | null>(null)
  const { copied, copy } = useCopy()

  const blocks = React.useMemo(() => items.map((item) => item.name), [items])
  const hints = compositionHints(blocks)

  const post = React.useCallback(
    (focus?: number) => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: COMPOSE_MESSAGE, blocks, focus },
        window.location.origin
      )
    },
    [blocks]
  )

  // Keep the URL shareable and the preview in sync. Debounced, because
  // dragging a row reorders the list on every pointer move.
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      window.history.replaceState(null, "", `/compose?blocks=${serializeComposition(blocks)}`)
      if (!ready.current) return
      post(pendingFocus.current ?? undefined)
      pendingFocus.current = null
    }, 120)
    return () => clearTimeout(timeout)
  }, [blocks, post])

  const add = (name: string) => {
    const index = insertionIndex(blocks, name)
    pendingFocus.current = index
    setItems((current) => [
      ...current.slice(0, index),
      ...toItems([name]),
      ...current.slice(index),
    ])
  }

  const move = (index: number, offset: -1 | 1) => {
    const target = index + offset
    if (target < 0 || target >= items.length) return
    pendingFocus.current = target
    setItems((current) => {
      const next = [...current]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const remove = (id: number) =>
    setItems((current) => current.filter((item) => item.id !== id))

  return (
    <div className="grid flex-1 grid-cols-1 lg:h-[calc(100svh-3.5rem)] lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b lg:overflow-y-auto lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
          <div>
            <h1 className="text-sm font-medium">Your page</h1>
            <p className="text-xs text-muted-foreground">
              {blocks.length} {blocks.length === 1 ? "section" : "sections"}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setItems(toItems(starterComposition))}
              className="h-7 cursor-pointer rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setItems([])}
              disabled={!items.length}
              className="h-7 cursor-pointer rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="p-3">
          {items.length ? (
            <Reorder.Group
              as="ol"
              axis="y"
              values={items}
              onReorder={setItems}
              aria-label="Sections, in page order"
              className="flex flex-col gap-1.5"
            >
              {items.map((item, index) => (
                <Row
                  key={item.id}
                  item={item}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  onFocus={() => post(index)}
                  onMove={(offset) => move(index, offset)}
                  onRemove={() => remove(item.id)}
                />
              ))}
            </Reorder.Group>
          ) : (
            <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
              Add sections below to start.
            </p>
          )}

          {hints.length > 0 && (
            <ul aria-label="Suggestions" className="mt-3 flex flex-col gap-1.5">
              {hints.map((hint) => (
                <li
                  key={hint}
                  className="flex gap-2 rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground"
                >
                  <Lightbulb className="mt-px size-3.5 shrink-0" />
                  {hint}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t p-3">
          <h2 className="px-1 pt-1 pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Add a section
          </h2>
          <div className="flex flex-col gap-3">
            {blockCategories.map((category) => {
              const options = blockList.filter((block) => block.category === category.slug)
              if (!options.length) return null
              return (
                <div key={category.slug}>
                  <p className="px-1 pb-1 text-xs font-medium">{category.title}</p>
                  <ul className="flex flex-col gap-1">
                    {options.map((block) => (
                      <li key={block.name}>
                        <button
                          type="button"
                          onClick={() => add(block.name)}
                          aria-label={`Add ${block.name}: ${block.title}`}
                          className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent"
                        >
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-sm">{block.title}</span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {block.name}
                            </span>
                          </span>
                          {block.tier === "pro" && (
                            <span className="rounded-full border px-1.5 font-mono text-[10px] text-muted-foreground">
                              Pro
                            </span>
                          )}
                          <Plus className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </aside>

      <section aria-label="Preview" className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">
          <ViewportToggle width={width} onChange={setWidth} className="hidden md:flex" />
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => copy(window.location.href)}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors hover:bg-accent"
            >
              {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
              {copied ? "Copied" : "Copy link"}
            </button>
            <a
              href={`/view/compose?blocks=${serializeComposition(blocks)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Open the page in a new tab"
              title="Open the page in a new tab"
              className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ExternalLink className="size-3.5" />
            </a>
            {blocks.length > 0 && (
              <OpenInV0Button
                name="composed page"
                url={composeRegistryUrl(blocks)}
                className="h-8"
              />
            )}
            <InstallDialog blocks={blocks} />
          </div>
        </div>
        <div className="h-[75svh] bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-3 sm:p-4 lg:h-auto lg:flex-1">
          <ResizableFrame
            src={src}
            title="Composed page preview"
            width={width}
            onWidthChange={setWidth}
            autoHeight={false}
            iframeRef={iframeRef}
            onReady={() => {
              ready.current = true
              post()
            }}
          />
        </div>
      </section>
    </div>
  )
}

function Row({
  item,
  index,
  isFirst,
  isLast,
  onFocus,
  onMove,
  onRemove,
}: {
  item: Item
  index: number
  isFirst: boolean
  isLast: boolean
  onFocus: () => void
  onMove: (offset: -1 | 1) => void
  onRemove: () => void
}) {
  const controls = useDragControls()
  const block = getBlock(item.name)!

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="group flex items-center gap-1 rounded-lg border bg-background py-1 pr-1 pl-1"
    >
      <button
        type="button"
        aria-label={`Drag ${item.name} to reorder`}
        onPointerDown={(event) => controls.start(event)}
        className="inline-flex size-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </button>
      <button
        type="button"
        onClick={onFocus}
        title="Show in preview"
        className="flex min-w-0 flex-1 cursor-pointer flex-col py-0.5 text-left"
      >
        <span className="truncate text-sm">
          <span className="mr-1.5 font-mono text-xs text-muted-foreground">{index + 1}</span>
          {getCategory(block.category).title}
        </span>
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {item.name}
        </span>
      </button>
      <IconButton label={`Move ${item.name} up`} disabled={isFirst} onClick={() => onMove(-1)}>
        <ArrowUp className="size-3.5" />
      </IconButton>
      <IconButton label={`Move ${item.name} down`} disabled={isLast} onClick={() => onMove(1)}>
        <ArrowDown className="size-3.5" />
      </IconButton>
      <IconButton label={`Remove ${item.name}`} onClick={onRemove}>
        <X className="size-3.5" />
      </IconButton>
    </Reorder.Item>
  )
}

function IconButton({
  label,
  className,
  ...props
}: { label: string } & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30",
        className
      )}
      {...props}
    />
  )
}
