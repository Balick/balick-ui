import { composePageSource } from "@/lib/compose"
import { composeResponse } from "@/lib/compose-response"
import { readBuiltItem } from "@/lib/registry"
import { composedCss, toV0Dependency } from "@/lib/v0-variant"

/**
 * The v0 variant of /r/compose/<blocks>.json: its blocks are v0 dependencies,
 * so the page below is the only app/page.tsx, and it carries the CSS of the
 * blocks' animations (see lib/v0-variant.ts).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blocks: string }> }
) {
  const { blocks } = await params
  return composeResponse(blocks, async (item, names) => {
    const css = await composedCss(names, readBuiltItem)
    const variant = toV0Dependency(item)
    return {
      ...variant,
      files: variant.files?.map((file) =>
        file.type === "registry:page" ? { ...file, content: composePageSource(names, { css }) } : file
      ),
    }
  })
}
