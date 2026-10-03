import { LoadingDots } from "@/registry/balick/ui/loading-dots"

export default function LoadingDotsDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-2xl font-semibold tracking-tight">
        Deploying
        <LoadingDots />
      </p>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border bg-card px-4 py-3 text-muted-foreground shadow-xs">
        <span className="sr-only">Lina is typing</span>
        <LoadingDots className="text-xl" />
      </div>
      <p className="text-sm text-muted-foreground">
        Saving changes
        <LoadingDots />
      </p>
    </div>
  )
}
