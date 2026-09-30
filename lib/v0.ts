import { siteConfig } from "@/config/site"

/*
 * "Open in v0" reads an item from a URL. We serve v0 its own variants of the
 * items (see lib/v0-variant.ts), in two kinds:
 *
 * - the entry, /r/v0/<name>.json: what v0 is asked to open. For a block or a
 *   demo, it carries the page that shows it;
 * - the dependency, /r/v0/deps/<name>.json: the same item without a page. An
 *   entry lists dependencies, never entries, so that a composed page (whose
 *   blocks are dependencies) is the only one to write app/page.tsx.
 */

const base = `${siteConfig.url}/r/v0`

/** URL of the v0 entry of an item, e.g. /r/v0/hero-01.json. */
export function v0RegistryUrl(name: string) {
  return `${base}/${name}.json`
}

/** URL of the v0 dependency of an item, e.g. /r/v0/deps/section.json. */
export function v0DepUrl(name: string) {
  return `${base}/deps/${name}.json`
}
