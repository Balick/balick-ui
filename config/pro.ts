import { siteConfig } from "@/config/site"

/**
 * Balick UI Pro: what is sold and how it is installed. Prices are in US
 * dollars, paid once. The checkout links come from Polar (Products → Checkout
 * Links) and are set per deployment, so previews never sell anything.
 */
export const proConfig = {
  name: "Balick UI Pro",
  /** The namespace buyers declare in components.json. */
  namespace: "@balick-pro",
  /** The environment variable that holds the license key in a project. */
  envVar: "BALICK_PRO_LICENSE",
  /** Days during which a purchase is refunded, no questions asked. */
  refundDays: 14,
  plans: [
    {
      id: "personal",
      name: "Personal",
      price: 79,
      seats: "1 developer",
      description: "For a solo developer or freelancer shipping their own projects and client work.",
      checkoutUrl: process.env.NEXT_PUBLIC_PRO_CHECKOUT_PERSONAL ?? "",
      features: [
        "Every Pro block and template",
        "Unlimited projects, personal and client",
        "Lifetime updates and new blocks",
        "Install with the shadcn CLI",
      ],
    },
    {
      id: "team",
      name: "Team",
      price: 249,
      seats: "Up to 10 developers",
      description: "For a studio or product team sharing one license across the whole codebase.",
      checkoutUrl: process.env.NEXT_PUBLIC_PRO_CHECKOUT_TEAM ?? "",
      features: [
        "Everything in Personal",
        "Up to 10 developers on one key",
        "Use the key in CI and previews",
        "Priority email support",
      ],
    },
  ],
} as const

export type ProPlan = (typeof proConfig.plans)[number]

/** Where the CLI fetches a Pro item. */
export const proRegistryUrl = `${siteConfig.url}/r/pro/{name}.json`

/** The components.json entry that gives a project access to the Pro registry. */
export const proRegistryConfig = {
  registries: {
    [proConfig.namespace]: {
      url: proRegistryUrl,
      headers: { Authorization: `Bearer \${${proConfig.envVar}}` },
    },
  },
}

/** The components.json entry, as shown in the setup steps. */
export const componentsJsonSnippet = JSON.stringify(proRegistryConfig, null, 2)

/** The .env.local line, as shown in the setup steps. */
export const envSnippet = `${proConfig.envVar}=your-license-key`

/** What to pass to `shadcn add` for a Pro item. */
export function proInstallTarget(name: string) {
  return `${proConfig.namespace}/${name}`
}

/** The plan buyers start from on the pricing page and in calls to action. */
export const defaultPlan = proConfig.plans[0]
