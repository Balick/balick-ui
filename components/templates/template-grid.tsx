import { fillerClasses, type GridBreakpoint } from "@/components/category-grid"
import { TemplateCard } from "@/components/templates/template-card"
import type { Template } from "@/content/templates"
import { cn } from "@/lib/utils"

const breakpoints: GridBreakpoint[] = [
  { columns: 1, show: "block", hide: "hidden" },
  { columns: 2, show: "sm:block", hide: "sm:hidden" },
  { columns: 3, show: "lg:block", hide: "lg:hidden" },
]

/** Templates as a hairline grid on the sheet. Place it in a full-width row. */
export function TemplateGrid({ templates, priority = 0 }: { templates: Template[]; priority?: number }) {
  return (
    <div className="overflow-hidden">
      <ul className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <li key={template.slug} className="border-r border-b border-rule transition-colors hover:bg-foreground/[0.02]">
            <TemplateCard template={template} priority={index < priority} />
          </li>
        ))}
        {fillerClasses(templates.length, breakpoints).map((classes, index) => (
          <li key={index} aria-hidden className={cn("border-r border-b border-rule bg-hatch", classes)} />
        ))}
      </ul>
    </div>
  )
}
