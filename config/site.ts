export const siteConfig = {
  name: "Balick UI",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://ui.balick.me",
  description:
    "Blocks for shadcn/ui, designed to fit together. Compose a page, then install it with one command.",
  links: {
    github: "https://github.com/balick/balick-ui",
  },
  author: { name: "Théo Balick", url: "https://balick.me" },
  /** Date of the build, shown in the footer's title block. */
  updated: process.env.BUILD_DATE ?? "",
}

export function registryUrl(name: string) {
  return `${siteConfig.url}/r/${name}.json`
}
