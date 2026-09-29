import type { Metadata } from "next"

import { CodeBlock } from "@/components/code-block"
import { CommandBlock } from "@/components/command-block"
import { DocsHeader, H2, InlineCode, P } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { installTarget } from "@/config/site"
import { shadcnAdd } from "@/lib/commands"
import { getRegistryItem } from "@/lib/registry"

export const metadata: Metadata = {
  title: "Theming",
  description: "Install the Balick UI palette, or keep your own shadcn/ui theme.",
}

type Tokens = Record<string, string>

function Swatch({ value }: { value: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        style={{ background: value }}
        className="size-4 shrink-0 rounded-sm border"
      />
      <code className="font-mono text-xs text-muted-foreground">{value}</code>
    </span>
  )
}

export default function ThemingPage() {
  const theme = getRegistryItem("theme") as unknown as {
    cssVars: { light: Tokens; dark: Tokens }
  }
  const { light, dark } = theme.cssVars
  const { radius, ...colors } = light

  return (
    <DocsPage
      href="/docs/theming"
      toc={[
        { id: "install", title: "Install the theme" },
        { id: "tokens", title: "Tokens" },
        { id: "typography", title: "Typography" },
        { id: "dark-mode", title: "Dark mode" },
      ]}
    >
      <DocsHeader
        crumbs={[{ title: "Docs", href: "/docs" }, { title: "Theming" }]}
        title="Theming"
        description="Every component and block is styled with the shadcn/ui CSS variables, so they follow your theme. Install the Balick palette to get the exact look of this site."
      />

      <H2 id="install">Install the theme</H2>
      <CommandBlock commands={shadcnAdd(installTarget("theme"))} />
      <P>
        The CLI writes the colour tokens, the radius and their dark variants to
        your global CSS file. Review the diff before committing if you already
        customised your theme.
      </P>

      <H2 id="tokens">Tokens</H2>
      <P className="mb-4">
        Paper and ink: one cool hue family instead of pure black and white.
        Light mode is ink on paper, dark mode is paper on ink. Cards and
        popovers sit above the canvas, muted surfaces below it, and emphasis
        comes from inverting <InlineCode>foreground</InlineCode> and{" "}
        <InlineCode>background</InlineCode> rather than from an accent colour.
        Radius: <InlineCode>{radius}</InlineCode>.
      </P>
      <div className="scrollbar-thin overflow-x-auto rounded-lg border bg-card shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">Token</th>
              <th className="px-4 py-2.5 font-medium">Light</th>
              <th className="px-4 py-2.5 font-medium">Dark</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Object.entries(colors).map(([name, value]) => (
              <tr key={name}>
                <td className="px-4 py-2.5">
                  <code className="font-mono text-[13px]">--{name}</code>
                </td>
                <td className="px-4 py-2.5">
                  <Swatch value={value} />
                </td>
                <td className="px-4 py-2.5">
                  {dark[name] && <Swatch value={dark[name]} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="typography">Typography</H2>
      <P>
        Components inherit your fonts. This site uses Geist and Geist Mono; to
        match it in a Next.js app, load them with{" "}
        <InlineCode>next/font</InlineCode> and map them to the Tailwind font
        variables.
      </P>
      <CodeBlock
        className="mt-4"
        title="app/layout.tsx"
        code={`import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={\`\${geistSans.variable} \${geistMono.variable} antialiased\`}>
        {children}
      </body>
    </html>
  )
}`}
      />
      <CodeBlock
        className="mt-4"
        lang="css"
        title="app/globals.css"
        code={`@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}`}
      />

      <H2 id="dark-mode">Dark mode</H2>
      <P>
        Dark values live under the <InlineCode>.dark</InlineCode> class, like
        shadcn/ui. Toggle it with{" "}
        <a
          href="https://github.com/pacocoursey/next-themes"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          next-themes
        </a>{" "}
        using <InlineCode>attribute=&quot;class&quot;</InlineCode>. Every block
        is designed and checked in both modes.
      </P>
    </DocsPage>
  )
}
