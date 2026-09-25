"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { OpenInV0Button } from "@/components/open-in-v0-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function PreviewFrame({
  name,
  code,
  children,
  className,
}: {
  name: string
  code: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const [key, setKey] = React.useState(0)

  return (
    <Tabs defaultValue="preview" className={cn("gap-0", className)}>
      <div className="flex items-center justify-between">
        <TabsList className="border-none">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            aria-label="Replay animation"
            title="Replay"
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <OpenInV0Button name={name} />
        </div>
      </div>
      <TabsContent value="preview" className="mt-2">
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-lg border bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-10">
          <div key={key} className="flex w-full items-center justify-center">
            {children}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-2">
        {code}
      </TabsContent>
    </Tabs>
  )
}
