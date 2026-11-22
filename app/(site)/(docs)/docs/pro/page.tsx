import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { CommandBlock } from "@/components/command-block"
import { DocsHeader, H2, InlineCode, P, Step, Steps } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { KeyChecker } from "@/components/pro/key-checker"
import { componentsJsonSnippet, defaultPlan, envSnippet, proConfig, proInstallTarget } from "@/config/pro"
import { installTarget } from "@/config/site"
import { shadcnAdd } from "@/lib/commands"

export const metadata: Metadata = {
  title: "Pro setup",
  description: `Install ${proConfig.name} blocks and templates with the shadcn CLI and your license key.`,
}

const troubleshooting = [
  {
    message: `Set ${proConfig.envVar} in .env.local to your license key`,
    fix: (
      <>
        The CLI did not find the key. Check the name of the variable in <InlineCode>.env.local</InlineCode>, and run
        the command from the folder that holds it.
      </>
    ),
  },
  {
    message: "This Balick UI Pro license key is not valid",
    fix: <>Copy the key again from your customer portal, without spaces or quotes, then check it below.</>,
  },
  {
    message: `Unknown registry "${proConfig.namespace}"`,
    fix: (
      <>
        The registry is not declared. Add the <InlineCode>registries</InlineCode> entry to{" "}
        <InlineCode>components.json</InlineCode> (step 2).
      </>
    ),
  },
  {
    message: "The license server could not be reached",
    fix: <>A temporary problem on our side. Wait a minute, then run the command again.</>,
  },
]

export default function ProDocsPage() {
  return (
    <DocsPage
      href="/docs/pro"
      toc={[
        { id: "setup", title: "Setup" },
        { id: "templates", title: "Templates" },
        { id: "check", title: "Check your key" },
        { id: "teams", title: "Teams and CI" },
        { id: "troubleshooting", title: "Troubleshooting" },
        { id: "license", title: "License" },
      ]}
    >
      <DocsHeader
        crumbs={[{ title: "Docs", href: "/docs" }, { title: "Pro" }]}
        title="Pro setup"
        description={`${proConfig.name} blocks install with the same shadcn CLI as the free ones. Your license key unlocks them, once per project.`}
      />

      <H2 id="setup">Setup</H2>
      <Steps>
        <Step title="Get a license key">
          <P className="mb-3">
            Buy a plan on the{" "}
            <Link href="/pro" className="font-medium text-foreground underline underline-offset-4">
              Pro page
            </Link>{" "}
            (from ${defaultPlan.price}, paid once). Your key is in your Polar customer portal, linked from the receipt.
          </P>
        </Step>
        <Step title="Declare the Pro registry">
          <P className="mb-3">
            Add the <InlineCode>{proConfig.namespace}</InlineCode> registry to <InlineCode>components.json</InlineCode>.
            The file only names the variable; the key itself stays out of git.
          </P>
          <CodeBlock lang="json" title="components.json" code={componentsJsonSnippet} />
        </Step>
        <Step title="Add your key">
          <P className="mb-3">
            Put the key in <InlineCode>.env.local</InlineCode> (or <InlineCode>.env</InlineCode>) at the root of the
            project. The CLI reads it and sends it as a header.
          </P>
          <CodeBlock lang="bash" title=".env.local" code={envSnippet} />
        </Step>
        <Step title="Install a Pro block">
          <P className="mb-3">Pass the namespaced name of any Pro block. Its dependencies come along.</P>
          <CommandBlock commands={shadcnAdd(proInstallTarget("hero-04"))} />
        </Step>
      </Steps>

      <H2 id="templates">Templates</H2>
      <P>
        A template installs <InlineCode>app/page.tsx</InlineCode> and every block it uses. Pro templates use the same
        key: once the registry is declared, run the command shown on the template page.
      </P>
      <CommandBlock className="mt-4" commands={shadcnAdd(installTarget("templates/launch"))} />
      <P>
        You can also open a template in the{" "}
        <Link href="/compose" className="font-medium text-foreground underline underline-offset-4">
          composer
        </Link>
        , add or remove blocks, and install the result the same way.
      </P>

      <H2 id="check">Check your key</H2>
      <P className="mb-4">Make sure a key works before you set up a project.</P>
      <KeyChecker />

      <H2 id="teams">Teams and CI</H2>
      <P>
        The key is only needed when you run the CLI: installed blocks are plain source files in your repository, so
        builds and deployments never call our servers. With the Team plan, every developer on the team (up to ten)
        uses the same key; store it in your password manager, and as a secret in CI if a pipeline runs{" "}
        <InlineCode>shadcn add</InlineCode>.
      </P>

      <H2 id="troubleshooting">Troubleshooting</H2>
      <P className="mb-4">The CLI prints the message the registry sends back. The most common ones:</P>
      <div className="overflow-hidden rounded-xl border">
        {troubleshooting.map((item) => (
          <div key={item.message} className="grid gap-1 border-b p-4 last:border-b-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
            <p className="font-mono text-xs leading-5">{item.message}</p>
            <p className="text-sm leading-6 text-muted-foreground">{item.fix}</p>
          </div>
        ))}
      </div>

      <H2 id="license">License</H2>
      <P>
        Use Pro blocks and templates in unlimited personal and client projects. Do not redistribute them as such, in
        a UI kit, a template marketplace or a public repository. The full terms are on the{" "}
        <Link href="/license" className="font-medium text-foreground underline underline-offset-4">
          license page
        </Link>
        .
      </P>
    </DocsPage>
  )
}
