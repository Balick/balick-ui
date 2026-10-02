import { HeartIcon } from "@/registry/balick/ui/heart-icon"

export default function HeartIconDemo() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Like"
        className="inline-flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <HeartIcon className="size-5" />
      </button>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <HeartIcon className="size-4" />
        Like
      </button>
    </div>
  )
}
