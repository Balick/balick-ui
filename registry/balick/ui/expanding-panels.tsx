"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const PanelContext = React.createContext<{ active: boolean; activate: () => void }>({
  active: false,
  activate: () => {},
})

export interface ExpandingPanelsProps extends React.ComponentProps<"div"> {
  /** Index of the panel open at first. */
  defaultIndex?: number
}

/**
 * A row of panels where the one under the pointer, focused or tapped widens
 * and reveals its text. The panels stack when the container is narrow. Give
 * the row a height, 24rem by default.
 */
export function ExpandingPanels({ defaultIndex = 0, className, children, ...props }: ExpandingPanelsProps) {
  const [active, setActive] = React.useState(defaultIndex)

  return (
    <div className="@container/panels w-full">
      <div
        data-slot="expanding-panels"
        className={cn("flex h-96 flex-col gap-2 @md/panels:flex-row", className)}
        {...props}
      >
        {React.Children.toArray(children).map((child, index) => (
          <PanelContext.Provider
            key={index}
            value={{ active: index === active, activate: () => setActive(index) }}
          >
            {child}
          </PanelContext.Provider>
        ))}
      </div>
    </div>
  )
}

export interface ExpandingPanelProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Icon shown next to the title. */
  icon?: React.ReactNode
  /** Illustration that fills the panel behind the text. */
  background?: React.ReactNode
}

/** A panel of ExpandingPanels. */
export function ExpandingPanel({
  title,
  description,
  icon,
  background,
  className,
  children,
  ...props
}: ExpandingPanelProps) {
  const { active, activate } = React.useContext(PanelContext)

  return (
    <div
      data-slot="expanding-panel"
      data-state={active ? "open" : "closed"}
      onPointerEnter={activate}
      className={cn(
        "group/panel relative isolate flex min-h-14 flex-col justify-end min-w-0 basis-0 overflow-hidden rounded-xl border bg-card transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none @md/panels:min-h-0 @md/panels:min-w-14",
        active ? "grow-[5]" : "grow",
        className
      )}
      {...props}
    >
      {background && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_30%,transparent_90%)] motion-reduce:transition-none",
            active ? "opacity-100" : "opacity-40"
          )}
        >
          {background}
        </div>
      )}
      <div className="flex flex-col p-4">
        <h3 className="flex items-center gap-2">
          {/* The whole panel is the button, through its ::after: keep the button itself untransformed. */}
          <button
            type="button"
            aria-expanded={active}
            onClick={activate}
            onFocus={activate}
            className="text-left font-medium whitespace-nowrap outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
          >
            <span
              className={cn(
                "flex items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
                // Collapsed in a row, the title runs upward along the panel.
                !active && "@md/panels:rotate-180 @md/panels:[writing-mode:vertical-rl]"
              )}
            >
              {icon}
              {title}
            </span>
          </button>
        </h3>
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
            active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          {/* Above the button's ::after, so links in the text stay clickable. */}
          <div className="relative z-10 overflow-hidden">
            {description && <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
