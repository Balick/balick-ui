import { composeResponse } from "@/lib/compose-response"
import { toV0Item } from "@/lib/v0"

/** The v0 variant of /r/compose/<blocks>.json (see lib/v0.ts). */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blocks: string }> }
) {
  const { blocks } = await params
  return composeResponse(blocks, toV0Item)
}
