import type { Metadata } from "next"

import { CodeBlock } from "@/components/code-block"
import { CommandBlock } from "@/components/command-block"
import { DocsHeader, H2, InlineCode, P, Step, Steps } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { registryUrl } from "@/config/site"
import { shadcn, shadcnAdd } from "@/lib/commands"

export const metadata: Metadata = {
  title: "Installation",
  description: "Add Balick UI components to your project with the shadcn CLI.",
}

export default function InstallationPage() {
  return (
    <DocsPage
      href="/docs/installation"
      toc={[
        { id: "setup", title: "Setup" },
        { id: "namespace", title: "Registry namespace" },
      ]}
    >
      <DocsHeader
        crumbs={[{ title: "Docs", href: "/docs" }, { title: "Installation" }]}
        title="Installation"
        description="Balick UI uses the shadcn CLI. If your project already uses shadcn/ui, you are ready."
      />

      <H2 id="setup">Setup</H2>
      <Steps>
        <Step title="Initialise shadcn/ui">
          <P className="mb-3">Skip this step if your project already has a <InlineCode>components.json</InlineCode>.</P>
          <CommandBlock commands={shadcn("init")} />
        </Step>
        <Step title="Add a component">
          <P className="mb-3">Pass the URL of any component to the <InlineCode>add</InlineCode> command.</P>
          <CommandBlock commands={shadcnAdd(registryUrl("marquee"))} />
        </Step>
        <Step title="Use it">
          <CodeBlock
            code={`import { Marquee } from "@/components/ui/marquee"

export default function Page() {
  return <Marquee>Hello world</Marquee>
}`}
          />
        </Step>
      </Steps>

      <H2 id="namespace">Registry namespace</H2>
      <P>
        Register Balick UI once in <InlineCode>components.json</InlineCode> to use
        short names like <InlineCode>@balick/marquee</InlineCode> instead of URLs.
      </P>
      <CodeBlock
        className="mt-4"
        lang="json"
        title="components.json"
        code={`{
  "registries": {
    "@balick": "${registryUrl("{name}")}"
  }
}`}
      />
      <CommandBlock className="mt-4" commands={shadcnAdd("@balick/marquee")} />
    </DocsPage>
  )
}
