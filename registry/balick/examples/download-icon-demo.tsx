import { DownloadIcon } from "@/registry/balick/ui/download-icon"

export default function DownloadIconDemo() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Download"
        className="inline-flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <DownloadIcon className="size-5" />
      </button>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <DownloadIcon className="size-4" />
        Download
      </button>
    </div>
  )
}
