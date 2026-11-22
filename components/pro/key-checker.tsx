"use client"

import * as React from "react"
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"

type Result =
  | { valid: true; expiresAt: string | null }
  | { valid: false; reason: "missing" | "invalid" | "expired" | "unconfigured" | "unavailable" | "rate-limited" }

const messages: Record<Exclude<Result, { valid: true }>["reason"], string> = {
  missing: "Paste your license key first.",
  invalid: "This key is not valid. Copy it again from your customer portal, without spaces.",
  expired: "This key has expired.",
  unconfigured: "License checks are not enabled on this deployment.",
  unavailable: "The license server could not be reached. Try again in a moment.",
  "rate-limited": "Too many attempts. Wait a minute, then try again.",
}

/** Checks a license key against the license server, without installing anything. */
export function KeyChecker({ className }: { className?: string }) {
  const [key, setKey] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [result, setResult] = React.useState<Result | null>(null)
  const inputId = React.useId()

  async function check(event: React.FormEvent) {
    event.preventDefault()
    setPending(true)
    setResult(null)
    try {
      const response = await fetch("/api/pro/license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      })
      setResult((await response.json()) as Result)
    } catch {
      setResult({ valid: false, reason: "unavailable" })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={check} className={cn("rounded-xl border bg-card p-4 shadow-xs", className)}>
      <label htmlFor={inputId} className="text-sm font-medium">
        License key
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            id={inputId}
            type={visible ? "text" : "password"}
            value={key}
            onChange={(event) => {
              setKey(event.target.value)
              setResult(null)
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder="Paste your key"
            className="h-9 w-full rounded-md border bg-background pr-10 pl-3 font-mono text-sm shadow-xs outline-none placeholder:font-sans placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "Hide the key" : "Show the key"}
            className="absolute top-1/2 right-1 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            {visible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        </div>
        <button
          type="submit"
          disabled={pending || !key.trim()}
          className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending && <Loader2 className="size-3.5 animate-spin" />}
          Check
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm">
        {result?.valid === true && (
          <span className="flex items-center gap-2">
            <Check className="size-4 text-emerald-500" aria-hidden />
            Valid key
            {result.expiresAt
              ? `, until ${new Date(result.expiresAt).toLocaleDateString("en-US", { dateStyle: "long" })}.`
              : ", for life."}
          </span>
        )}
        {result?.valid === false && (
          <span className="flex items-center gap-2 text-muted-foreground">
            <X className="size-4 shrink-0 text-foreground" aria-hidden />
            {messages[result.reason] ?? messages.invalid}
          </span>
        )}
        {!result && <span className="text-muted-foreground">The key is only sent to check it, never stored.</span>}
      </p>
    </form>
  )
}
