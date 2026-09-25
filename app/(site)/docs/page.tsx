import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { DocsHeader, H2, InlineCode, P } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"

export const metadata: Metadata = {
  title: "Introduction",
  description: "What Balick UI is, and how it fits in your shadcn/ui project.",
}

const principles = [
  { title: "You own the code", body: "Every component is copied into your project. Read it, change it, delete what you don't need." },
  { title: "Built on shadcn/ui", body: "Same conventions, same CSS variables, same CLI. Balick UI is an extension, not a replacement." },
  { title: "Quiet by default", body: "Motion should guide attention, not steal it. Every animation respects reduced motion." },
  { title: "Production ready", body: "Typed props, accessible markup, React 19 and Tailwind CSS v4 out of the box." },
]

export default function IntroductionPage() {
  return (
    <DocsPage
      href="/docs"
      toc={[
        { id: "principles", title: "Principles" },
        { id: "what-is-inside", title: "What's inside" },
        { id: "faq", title: "FAQ" },
      ]}
    >
      <DocsHeader
        crumbs={[{ title: "Docs", href: "/docs" }, { title: "Introduction" }]}
        title="Introduction"
        description="Beautifully minimal components, blocks and templates, built on top of shadcn/ui."
      />
      <P className="mt-8">
        Balick UI is a collection of copy-and-paste building blocks for React. It is
        not a dependency you install: you pick the pieces you want and the{" "}
        <InlineCode>shadcn</InlineCode> CLI adds their source code to your project.
      </P>

      <H2 id="principles">Principles</H2>
      <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
        {principles.map((item) => (
          <div key={item.title} className="bg-background p-5">
            <h3 className="font-medium">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      <H2 id="what-is-inside">What&apos;s inside</H2>
      <ul className="flex flex-col divide-y rounded-lg border">
        {[
          { title: "Components", body: "Standalone, animated or original UI elements.", href: "/docs/components" },
          { title: "Blocks", body: "Complete sections: heroes, pricing, testimonials, footers.", href: "/blocks" },
          { title: "Templates", body: "Full pages assembled from blocks, ready to deploy.", href: "/templates" },
        ].map((item) => (
          <li key={item.title}>
            <Link href={item.href} className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-accent/50">
              <span>
                <span className="font-medium">{item.title}</span>
                <span className="block text-sm text-muted-foreground">{item.body}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </li>
        ))}
      </ul>

      <H2 id="faq">FAQ</H2>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-medium">Do I need shadcn/ui?</h3>
          <P className="mt-1">
            You need a project initialised with <InlineCode>shadcn init</InlineCode>, so
            the CLI knows where to put files and the theme variables exist.
          </P>
        </div>
        <div>
          <h3 className="font-medium">Is it free?</h3>
          <P className="mt-1">Yes. Everything is open source and free to use in personal and commercial projects.</P>
        </div>
        <div>
          <h3 className="font-medium">Which frameworks are supported?</h3>
          <P className="mt-1">Any React framework supported by shadcn/ui: Next.js, Vite, React Router, Astro, TanStack Start.</P>
        </div>
      </div>
    </DocsPage>
  )
}
