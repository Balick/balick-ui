import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "How it works",
  title: "From idea to production in four steps.",
  description: "No servers to manage and no pipeline to maintain. Connect a repository and ship.",
}

const steps = [
  {
    title: "Connect your repository",
    description: "Import a project from GitHub, GitLab or Bitbucket. Acme detects the framework.",
    duration: "1 min",
  },
  {
    title: "Configure once",
    description: "Add environment variables and a domain. Sensible defaults cover the rest.",
    duration: "5 min",
  },
  {
    title: "Preview every change",
    description: "Each pull request gets its own URL, so the whole team reviews real pages.",
    duration: "Every push",
  },
  {
    title: "Ship with confidence",
    description: "Merge to deploy worldwide. Roll back in one click if anything goes wrong.",
    duration: "Instant",
  },
]

export function Steps01({ id = "steps" }: { id?: string }) {
  return (
    <Section id={id}>
      <SectionHeader {...header} />
      <ol className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-14 lg:pt-14 lg:pl-0">
            {/* Connector to the next step: vertical on mobile, horizontal from lg. */}
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-8 -bottom-12 left-4 w-px bg-border lg:top-4 lg:-right-8 lg:bottom-auto lg:left-8 lg:h-px lg:w-auto"
              />
            )}
            <span
              aria-hidden
              className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border bg-background font-mono text-xs"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {step.duration}
            </p>
            <h3 className="mt-2 font-medium">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
