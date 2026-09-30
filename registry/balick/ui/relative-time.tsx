"use client"

import * as React from "react"

export interface RelativeTimeProps extends Omit<React.ComponentProps<"time">, "children" | "dateTime"> {
  /** The moment to describe. */
  date: Date | string | number
  /** Language of the text, as a BCP 47 tag. */
  locale?: string
}

const steps: [Intl.RelativeTimeFormatUnit, number][] = [
  ["second", 60],
  ["minute", 60],
  ["hour", 24],
  ["day", 7],
  ["week", 4.35],
  ["month", 12],
  ["year", Infinity],
]

function describe(date: number, now: number, locale: string) {
  let value = (date - now) / 1000
  for (const [unit, size] of steps) {
    if (Math.abs(value) < size) {
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(Math.round(value), unit)
    }
    value /= size
  }
  return ""
}

/**
 * "5 minutes ago", "in 3 days": a date described relative to now, kept up
 * to date while the page is open. The exact date is in the `title` and the
 * `datetime` attribute.
 */
export function RelativeTime({ date, locale = "en", ...props }: RelativeTimeProps) {
  const time = new Date(date).getTime()
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    // Refresh often while the date is close, then once a minute.
    const refresh = Math.abs(time - Date.now()) < 60_000 ? 10_000 : 60_000
    const timer = setTimeout(() => setNow(Date.now()), refresh)
    return () => clearTimeout(timer)
  }, [now, time])

  return (
    <time
      dateTime={new Date(time).toISOString()}
      title={new Date(time).toLocaleString(locale, { dateStyle: "long", timeStyle: "short" })}
      // The server and the browser read the clock at different moments.
      suppressHydrationWarning
      {...props}
    >
      {describe(time, now, locale)}
    </time>
  )
}
