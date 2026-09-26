"use client"

import * as React from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"

import { FRAME_HEIGHT_MESSAGE } from "@/components/frame-height-reporter"
import { cn } from "@/lib/utils"

const viewports = [
  { label: "Desktop", icon: Monitor, width: null },
  { label: "Tablet", icon: Tablet, width: 768 },
  { label: "Mobile", icon: Smartphone, width: 390 },
] as const

const MIN_WIDTH = 320

/** Desktop / tablet / mobile switch. `null` means full width. */
export function ViewportToggle({
  width,
  onChange,
  className,
}: {
  width: number | null
  onChange: (width: number | null) => void
  className?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Viewport"
      className={cn("h-8 items-center gap-0.5 rounded-md border p-0.5", className)}
    >
      {viewports.map(({ label, icon: Icon, width: w }) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={width === w}
          aria-label={label}
          title={label}
          onClick={() => onChange(w)}
          className={cn(
            "inline-flex size-6.5 cursor-pointer items-center justify-center rounded-sm transition-colors",
            width === w
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  )
}

interface ResizableFrameProps {
  src: string
  title: string
  /** Width of the frame in pixels, or `null` for full width. */
  width: number | null
  onWidthChange: (width: number | null) => void
  /**
   * Grow the iframe to the height of its page. Otherwise the iframe fills
   * its container and scrolls, like a browser window.
   */
  autoHeight?: boolean
  /** Called once the page inside the iframe has hydrated. */
  onReady?: () => void
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
  className?: string
}

/**
 * An iframe preview with a drag handle to resize it. The page inside must
 * render <FrameHeightReporter />, which reports its height and signals that
 * it is ready.
 */
export function ResizableFrame({
  src,
  title,
  width,
  onWidthChange,
  autoHeight = true,
  onReady,
  iframeRef: externalRef,
  className,
}: ResizableFrameProps) {
  const [dragging, setDragging] = React.useState(false)
  const [height, setHeight] = React.useState(640)
  const [loaded, setLoaded] = React.useState(false)
  const frameRef = React.useRef<HTMLDivElement>(null)
  const internalRef = React.useRef<HTMLIFrameElement>(null)
  const iframeRef = externalRef ?? internalRef
  const onReadyRef = React.useRef(onReady)
  onReadyRef.current = onReady

  React.useEffect(() => {
    let ready = false
    const onMessage = (event: MessageEvent) => {
      if (
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.type !== FRAME_HEIGHT_MESSAGE
      ) {
        return
      }
      // The height message doubles as the load signal: onLoad can fire
      // before hydration and be missed.
      setHeight(event.data.height)
      setLoaded(true)
      if (!ready) {
        ready = true
        onReadyRef.current?.()
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [iframeRef])

  const resize = (event: React.PointerEvent) => {
    if (!dragging || !frameRef.current?.parentElement) return
    const left = frameRef.current.getBoundingClientRect().left
    const max = frameRef.current.parentElement.getBoundingClientRect().width
    const next = Math.round(Math.min(Math.max(event.clientX - left, MIN_WIDTH), max))
    onWidthChange(next >= max ? null : next)
  }

  return (
    <div
      ref={frameRef}
      style={{ width: width ?? "100%" }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-background ring-1 ring-border",
        !autoHeight && "h-full",
        !dragging && "transition-[width] duration-300 ease-out",
        className
      )}
    >
      {!loaded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-pulse bg-muted/40"
        />
      )}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        style={autoHeight ? { height } : undefined}
        className={cn(
          "block w-full bg-background",
          !autoHeight && "h-full",
          dragging && "pointer-events-none"
        )}
      />
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize preview"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          setDragging(true)
        }}
        onPointerMove={resize}
        onPointerUp={() => setDragging(false)}
        className="group absolute inset-y-0 right-0 hidden w-4 cursor-ew-resize items-center justify-center md:flex"
      >
        <span className="h-10 w-1 rounded-full bg-border transition-colors group-hover:bg-foreground/40" />
      </div>
      {dragging && (
        <span className="absolute top-3 right-6 rounded-md bg-foreground px-2 py-1 font-mono text-xs text-background">
          {width ? `${width}px` : "100%"}
        </span>
      )}
    </div>
  )
}
