export const siteConfig = {
  name: "Balick UI",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://ui.balick.me",
  description:
    "Blocks for shadcn/ui, designed to fit together. Compose a page, then install it with one command.",
  links: {
    github: "https://github.com/balick/balick-ui",
  },
  author: { name: "Théo Balick", url: "https://balick.me" },
  /** Short commit of the deployment, shown in the footer's title block. */
  revision: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
}

export function registryUrl(name: string) {
  return `${siteConfig.url}/r/${name}.json`
}
