import { NumberTicker } from "@/registry/balick/ui/number-ticker"

export default function NumberTickerDemo() {
  return (
    <dl className="grid grid-cols-2 gap-x-12 gap-y-8 text-center">
      <div className="flex flex-col gap-1">
        <dd className="order-first text-4xl font-semibold tracking-tighter">
          <NumberTicker value={12480} />
        </dd>
        <dt className="text-sm text-muted-foreground">Developers</dt>
      </div>
      <div className="flex flex-col gap-1">
        <dd className="order-first text-4xl font-semibold tracking-tighter">
          <NumberTicker value={99.99} decimals={2} suffix="%" />
        </dd>
        <dt className="text-sm text-muted-foreground">Uptime</dt>
      </div>
    </dl>
  )
}
