import * as React from "react"

import { cn } from "@/lib/utils"

const containerWidths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
}

const sectionSpacings = {
  none: "",
  compact: "py-16 sm:py-20",
  default: "py-24 sm:py-32",
}

type ContainerWidth = keyof typeof containerWidths

export interface ContainerProps extends React.ComponentProps<"div"> {
  /** Maximum width of the content. */
  width?: ContainerWidth
}

/** Centred column with the horizontal padding shared by every block. */
export function Container({
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full px-6", containerWidths[width], className)}
      {...props}
    />
  )
}

export interface SectionProps extends React.ComponentProps<"section"> {
  /** Vertical padding. Use "none" when the block manages its own. */
  spacing?: keyof typeof sectionSpacings
  /** Maximum width of the content. */
  width?: ContainerWidth
  /** Classes applied to the inner container. */
  containerClassName?: string
}

/**
 * Outer shell of a block: full-width background, vertical rhythm and
 * a centred container. Blocks that share it stack without gaps or overlaps.
 */
export function Section({
  spacing = "default",
  width = "default",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn("relative", sectionSpacings[spacing], className)}
      {...props}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}

export interface SectionHeaderProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** Short label above the title, set in monospace capitals. */
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  /** Heading level of the title. */
  as?: "h1" | "h2" | "h3"
}

/** Eyebrow, title and description, styled the same way in every block. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
  children,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-4xl font-semibold tracking-tighter text-balance sm:text-5xl",
          eyebrow && "mt-3"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-lg text-balance text-muted-foreground">
          {description}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  )
}
