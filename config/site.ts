export const siteConfig = {
  name: "Balick UI",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://ui.balick.dev",
  description:
    "Beautifully minimal components, blocks and templates built on top of shadcn/ui. Copy, paste, ship.",
  links: {
    github: "https://github.com/balick/balick-ui",
  },
}

export function registryUrl(name: string) {
  return `${siteConfig.url}/r/${name}.json`
}
