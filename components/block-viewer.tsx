"use client"

import * as React from "react"
import { Check, ExternalLink, FileCode2, Terminal } from "lucide-react"

import { OpenInV0Button } from "@/components/open-in-v0-button"
import { ResizableFrame, ViewportToggle } from "@/components/resizable-frame"
import { useCopy } from "@/hooks/use-copy"
import { usePackageManager } from "@/hooks/use-package-manager"
import type { Commands } from "@/lib/commands"
import { cn } from "@/lib/utils"

interface BlockViewerProps {
  name: string
  title: string
  description: string
  commands: Commands
  dependencies: string[]
  files: { path: string; code: React.ReactNode }[]
}

export function BlockViewer({
  name,
  title,
  description,
  commands,
  dependencies,
  files,
}: BlockViewerProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [width, setWidth] = React.useState<number | null>(null)
  const [activeFile, setActiveFile] = React.useState(0)

  return (
    <section id={name}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="font-medium">
            <a href={`#${name}`} className="hover:underline hover:underline-offset-4">
              {title}
            </a>
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: "preview", label: "Preview" },
              { value: "code", label: "Code" },
            ]}
          />
          <ViewportToggle
            width={width}
            onChange={(next) => {
              setView("preview")
              setWidth(next)
            }}
            className="hidden md:flex"
          />
          <CopyCommand name={name} commands={commands} />
          <a
            href={`/view/${name}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in a new tab"
            title="Open in a new tab"
            className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
          </a>
          <OpenInV0Button name={name} className="h-8" />
        </div>
      </div>

      <div className="mt-4">
        <div
          hidden={view !== "preview"}
          className="relative rounded-xl border bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
        >
          <ResizableFrame
            src={`/view/${name}`}
            title={`${title} preview`}
            width={width}
            onWidthChange={setWidth}
          />
        </div>

        {view === "code" && (
          <div className="overflow-hidden rounded-xl border md:grid md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4 border-b bg-muted/30 p-3 md:border-r md:border-b-0">
              <div>
                <p className="px-2 pb-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Files
                </p>
                {files.map((file, i) => (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => setActiveFile(i)}
                    className={cn(
                      "flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2 text-left font-mono text-xs transition-colors",
                      i === activeFile
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <FileCode2 className="size-3.5 shrink-0" />
                    <span className="truncate">{file.path}</span>
                  </button>
                ))}
              </div>
              {dependencies.length > 0 && (
                <div>
                  <p className="px-2 pb-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    Installs
                  </p>
                  <ul className="flex flex-wrap gap-1 px-2">
                    {dependencies.map((dep) => (
                      <li key={dep} className="rounded border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                        {dep}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="max-h-[640px] overflow-auto [&_figure]:rounded-none [&_figure]:border-0">
              {files[activeFile]?.code}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex h-8 items-center gap-0.5 rounded-md border p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-6.5 cursor-pointer rounded-sm px-2.5 text-xs font-medium transition-colors",
            value === option.value
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function CopyCommand({ name, commands }: { name: string; commands: Commands }) {
  const [manager] = usePackageManager()
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(commands[manager])}
      title={commands[manager]}
      className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border px-2.5 font-mono text-xs transition-colors hover:bg-accent"
    >
      {copied ? <Check className="size-3.5" /> : <Terminal className="size-3.5 text-muted-foreground" />}
      <span>{copied ? "Copied" : `add ${name}`}</span>
    </button>
  )
}
