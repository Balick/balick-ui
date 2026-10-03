import { Spinner } from "@/registry/balick/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-5 text-foreground">
        <Spinner className="size-4" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
        <Spinner className="size-6 text-muted-foreground" />
      </div>
      <div className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm shadow-xs">
        <Spinner className="size-4" label="Building" />
        Building your project
      </div>
    </div>
  )
}
