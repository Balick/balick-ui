import { BrowserFrame } from "@/registry/balick/ui/browser-frame"

export default function BrowserFrameDemo() {
  return (
    <BrowserFrame url="acme.com/dashboard" className="w-full max-w-lg">
      <div className="grid grid-cols-[6rem_1fr] gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-16 rounded-full bg-foreground/20" />
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-2.5 rounded-full bg-muted" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {["2.4k", "318", "92%"].map((value) => (
              <div key={value} className="rounded-lg border bg-background p-2">
                <div className="h-1.5 w-8 rounded-full bg-muted" />
                <p className="mt-2 text-sm font-semibold tracking-tight">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-1.5 rounded-lg border bg-background p-3">
            {[30, 50, 40, 70, 55, 85, 65, 95, 75].map((height, index) => (
              <div key={index} className="flex-1 rounded-sm bg-muted last:bg-foreground/80" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
