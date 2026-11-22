import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, ChevronRight, Download, LayoutTemplate } from "lucide-react"

import { InstallDialog } from "@/components/composer/install-dialog"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { ProBadge } from "@/components/pro/pro-badge"
import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { TemplateGrid } from "@/components/templates/template-grid"
import { TemplatePreview } from "@/components/templates/template-preview"
import { defaultPlan, proConfig } from "@/config/pro"
import { siteConfig } from "@/config/site"
import { getBlock, getCategory } from "@/content/blocks"
import {
  getTemplate,
  templateComposeHref,
  templateHref,
  templatePreviewHref,
  templates,
} from "@/content/templates"
import { composeV0Url } from "@/lib/compose"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }> }

const pad = "px-4 md:px-6"

export const dynamicParams = false

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = getTemplate((await params).slug)
  if (!template) return {}
  return {
    title: `${template.title} template`,
    description: `${template.description} Built with shadcn/ui, Tailwind CSS and Next.js, installable with one command.`,
    alternates: { canonical: templateHref(template.slug) },
  }
}

export default async function TemplatePage({ params }: Props) {
  const template = getTemplate((await params).slug)
  if (!template) notFound()

  const pro = template.tier === "pro"
  const blocks = template.blocks.map((name) => getBlock(name)!)
  const others = [
    ...templates.filter((other) => other.slug !== template.slug && other.tier === template.tier),
    ...templates.filter((other) => other.tier !== template.tier),
  ].slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${template.title} template`,
    description: template.description,
    url: `${siteConfig.url}${templateHref(template.slug)}`,
    programmingLanguage: ["TypeScript", "React"],
    runtimePlatform: "Next.js",
    isAccessibleForFree: !pro,
    ...(pro
      ? {
          offers: {
            "@type": "Offer",
            price: defaultPlan.price,
            priceCurrency: "USD",
            url: `${siteConfig.url}/pro`,
          },
        }
      : { license: "https://opensource.org/licenses/MIT" }),
  }

  return (
    <div className="sheet">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Spacer className="h-12 sm:h-16" />
      <Row>
        <nav aria-label="Breadcrumb" className={cn(pad, "py-3")}>
          <ol className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            <li>
              <Link href="/templates" className="transition-colors hover:text-foreground">
                Templates
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3" />
            </li>
            <li className="text-foreground" aria-current="page">
              {template.title}
            </li>
          </ol>
        </nav>
      </Row>
      <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
        <Row as="span" className={cn(pad, "flex items-center gap-3 py-2")}>
          {template.title}
          {pro ? (
            <ProBadge className="h-5 px-2 text-[11px]" />
          ) : (
            <span className="rounded-full border px-2 py-0.5 font-mono text-[11px] font-normal tracking-wider text-muted-foreground uppercase">
              Free
            </span>
          )}
        </Row>
      </h1>
      <Row>
        <p className={cn(pad, "max-w-2xl py-3 text-lg text-balance text-muted-foreground")}>{template.description}</p>
      </Row>
      <Row>
        <div className={cn(pad, "flex flex-wrap items-center gap-2 py-4")}>
          <InstallDialog
            blocks={template.blocks}
            target={template.target}
            title={`Install the ${template.title} template`}
            trigger={
              <button
                type="button"
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                <Download className="size-4" />
                Install
              </button>
            }
          />
          <Link
            href={templateComposeHref(template)}
            className="inline-flex h-10 items-center gap-2 rounded-md border bg-card px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
          >
            <LayoutTemplate className="size-4" />
            Customise in the composer
          </Link>
          {!pro && <OpenInV0Button name={template.title} url={composeV0Url(template.blocks)} className="h-10 px-4 text-sm" />}
          {pro && (
            <Link
              href="/pro"
              className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Get {proConfig.name} from ${defaultPlan.price}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </Row>

      <Row>
        <div className="p-2 sm:p-4">
          <TemplatePreview src={templatePreviewHref(template)} title={`${template.slug}.balick.app`} />
        </div>
      </Row>

      <Spacer marks className="h-10 sm:h-12" />
      <Row>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={cn(pad, "border-b border-rule py-8 md:border-r md:border-b-0")}>
            <SheetLabel index="01">What it is for</SheetLabel>
            <p className="mt-4 text-lg font-medium tracking-tight text-balance">{template.audience}</p>
            <ul className="mt-6 space-y-3">
              {template.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-foreground" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 text-muted-foreground">
              Installs <code className="font-mono text-foreground">app/page.tsx</code> and {blocks.length} blocks into
              your project, with their dependencies. Every block is yours to edit: copy, colours and layout.
            </p>
          </div>
          <div className={cn(pad, "py-8")}>
            <SheetLabel index="02">{blocks.length} blocks, in order</SheetLabel>
            <ol className="mt-4 divide-y divide-rule">
              {blocks.map((block, index) => (
                <li key={`${block.name}-${index}`}>
                  <Link
                    href={`/blocks/${block.category}#${block.name}`}
                    className="group flex items-center gap-3 py-2.5 text-sm"
                  >
                    <span className="w-6 font-mono text-[11px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium">{block.title}</span>
                    {block.tier === "pro" && <ProBadge />}
                    <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground sm:inline">
                      {getCategory(block.category).title}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Row>

      {others.length > 0 && (
        <>
          <Spacer marks className="h-10 sm:h-12" />
          <Row>
            <div className={cn(pad, "flex items-center justify-between gap-2 py-3")}>
              <SheetLabel index="03">More templates</SheetLabel>
              <Link href="/templates" className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase hover:text-foreground">
                All templates →
              </Link>
            </div>
          </Row>
          <Row>
            <TemplateGrid templates={others} />
          </Row>
        </>
      )}
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
