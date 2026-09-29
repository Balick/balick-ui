import { composeResponse } from "@/lib/compose-response"

/**
 * Serves a registry item for any composition, e.g.
 * /r/compose/navbar-01,hero-01,footer-01.json, so the shadcn CLI installs
 * the page and all its blocks with one command.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blocks: string }> }
) {
  const { blocks } = await params
  return composeResponse(blocks)
}
