import { cn } from "@/lib/utils"

/*
 * The site is drawn like a technical sheet: a column bounded by two rails,
 * horizontal rules that run edge to edge, and register marks where a rule
 * crosses a rail. Blocks never use these; they are the site's own frame.
 */

/**
 * The two vertical rails of the sheet, fixed behind the page content. The
 * margins outside them are hatched; the column between them stays plain.
 */
export function Rails() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-hatch">
      <div className="sheet h-full border-x border-rule bg-background" />
    </div>
  )
}

/** A small cross where a rule meets a rail. Place it on a positioned parent. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 size-[9px] before:absolute before:top-0 before:left-1/2 before:h-full before:w-px before:-translate-x-1/2 before:bg-mark after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:-translate-y-1/2 after:bg-mark",
        className
      )}
    />
  )
}

/** A hairline that runs across the whole viewport. */
export function Line({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 h-px w-screen -translate-x-1/2 bg-rule",
        className
      )}
    />
  )
}

/**
 * A row of the sheet: its content, with an edge-to-edge rule below (and
 * above, with `top`). `marks` adds crosses where the rules meet the rails;
 * the row must then span the full width of the sheet.
 */
export function Row({
  as: Tag = "div",
  top = false,
  bottom = true,
  marks = false,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  /** Use "span" inside headings and other phrasing content. */
  as?: "div" | "span" | "li"
  top?: boolean
  bottom?: boolean
  marks?: boolean
}) {
  return (
    <Tag className={cn("relative", Tag === "span" && "block", className)} {...props}>
      {top && <Line className="top-0" />}
      {children}
      {bottom && <Line className="bottom-0" />}
      {marks && top && (
        <>
          <Mark className="top-0 left-0 -translate-1/2" />
          <Mark className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        </>
      )}
      {marks && bottom && (
        <>
          <Mark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <Mark className="right-0 bottom-0 translate-1/2" />
        </>
      )}
    </Tag>
  )
}

/** An empty ruled row, used as vertical rhythm between groups of rows. */
export function Spacer({ className, marks }: { className?: string; marks?: boolean }) {
  return <Row aria-hidden marks={marks} className={cn("h-12 sm:h-16", className)} />
}

/**
 * Mono label for a section of the sheet, such as "01 · Anatomy".
 * Used in eyebrow rows.
 */
export function SheetLabel({
  index,
  children,
  className,
}: {
  index?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
        className
      )}
    >
      {index && <span className="text-foreground">{index}</span>}
      {index && <span aria-hidden>·</span>}
      {children}
    </p>
  )
}
