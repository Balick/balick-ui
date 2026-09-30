const productionUrl = "https://ui.balick.me"

export const siteConfig = {
  name: "Balick UI",
  url: (process.env.NEXT_PUBLIC_BASE_URL || productionUrl).replace(/\/$/, ""),
  description:
    "Blocks for shadcn/ui, designed to fit together. Compose a page, then install it with one command.",
  links: {
    github: "https://github.com/balick/balick-ui",
  },
}

export function registryUrl(name: string) {
  return `${siteConfig.url}/r/${name}.json`
}

/**
 * What to pass to `shadcn add`. On production it is the short `@balick/<name>`,
 * which the shadcn registry directory resolves. Other deployments, such as
 * previews, show their own full URL so they install what they serve.
 */
export function installTarget(name: string) {
  return siteConfig.url === productionUrl ? `@balick/${name}` : registryUrl(name)
}
