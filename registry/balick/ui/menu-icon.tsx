import * as React from "react"

import { cn } from "@/lib/utils"

export interface MenuIconProps extends React.ComponentProps<"svg"> {
  /** Show the cross that closes the menu instead of the three bars. */
  open?: boolean
}

/**
 * Three bars that fold into a cross when the menu opens. The change is
 * immediate under reduced motion.
 */
export function MenuIcon({ open = false, className, ...props }: MenuIconProps) {
  return (
    <svg
      data-slot="menu-icon"
      data-state={open ? "open" : "closed"}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
      {...props}
    >
      <path
        d="M4 6h16"
        className={cn("origin-[12px_6px] [transform-box:view-box] transition-[opacity,translate,rotate,scale] duration-300 ease-out motion-reduce:transition-none", open && "translate-y-[6px] rotate-45")}
      />
      <path d="M4 12h16" className={cn("origin-[12px_12px] [transform-box:view-box] transition-[opacity,translate,rotate,scale] duration-300 ease-out motion-reduce:transition-none", open && "scale-x-0 opacity-0")} />
      <path
        d="M4 18h16"
        className={cn("origin-[12px_18px] [transform-box:view-box] transition-[opacity,translate,rotate,scale] duration-300 ease-out motion-reduce:transition-none", open && "-translate-y-[6px] -rotate-45")}
      />
    </svg>
  )
}
