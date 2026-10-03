import { PhoneFrame } from "@/registry/balick/ui/phone-frame"

export default function PhoneFrameDemo() {
  return (
    <PhoneFrame width="9.5rem">
      <div className="flex h-full flex-col px-3 pt-9 pb-3">
        <p className="text-[10px] text-muted-foreground">Good morning</p>
        <p className="text-sm font-semibold tracking-tight">Today</p>
        <div className="mt-3 rounded-xl bg-foreground p-3 text-background">
          <p className="text-[9px] opacity-60">Balance</p>
          <p className="text-base font-semibold tracking-tight">$4,280</p>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {["Coffee", "Train", "Books"].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border bg-card px-2 py-1.5">
              <span className="size-4 rounded-md bg-muted" />
              <span className="flex-1 text-[10px]">{item}</span>
              <span className="text-[10px] text-muted-foreground">-${(index + 1) * 4}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex justify-around rounded-full border bg-card py-1.5">
          {[0, 1, 2, 3].map((tab) => (
            <span key={tab} className={tab === 0 ? "size-1.5 rounded-full bg-foreground" : "size-1.5 rounded-full bg-muted-foreground/40"} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
