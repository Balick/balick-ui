import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { ProBadge } from "@/components/pro/pro-badge"
import { templateHref, templateImage, type Template } from "@/content/templates"
import { cn } from "@/lib/utils"

/**
 * A template on the gallery: a tall screenshot of the page that scrolls
 * down while the card is hovered, like a quick look through the page.
 */
export function TemplateCard({
  template,
  priority = false,
  className,
}: {
  template: Template
  priority?: boolean
  className?: string
}) {
  const image = (scheme: "light" | "dark") => (
    <Image
      src={templateImage(template.slug, scheme)}
      alt=""
      fill
      priority={priority}
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className={cn(
        "object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none",
        scheme === "light" ? "dark:hidden" : "hidden dark:block"
      )}
    />
  )

  return (
    <Link href={templateHref(template.slug)} className={cn("group flex h-full flex-col p-4 sm:p-6", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted shadow-xs transition-shadow group-hover:shadow-md">
        {image("light")}
        {image("dark")}
      </div>
      <div className="mt-5 flex items-center gap-2">
        <h3 className="font-medium">{template.title}</h3>
        {template.tier === "pro" ? (
          <ProBadge />
        ) : (
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Free</span>
        )}
        <ArrowUpRight
          aria-hidden
          className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{template.description}</p>
      <p className="mt-auto pt-4 font-mono text-[11px] text-muted-foreground">
        {template.blocks.length} blocks
      </p>
    </Link>
  )
}
