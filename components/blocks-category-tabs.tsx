"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { CategoryTabs } from "@/components/category-tabs"

type Category = { slug: string; title: string; count: number }

/** Category tabs of the blocks gallery, across the whole sheet. */
export function BlocksCategoryTabs({
  categories,
  active,
  total,
}: {
  categories: Category[]
  /** Slug of the current category. */
  active: string
  total: number
}) {
  return (
    <CategoryTabs
      label="Block categories"
      bleed
      tabs={[
        { href: "/blocks", title: "All", count: total, current: false },
        ...categories.map((category) => ({
          href: `/blocks/${category.slug}`,
          title: category.title,
          count: category.count,
          current: category.slug === active,
        })),
      ]}
    />
  )
}

/**
 * Sends links from the single-page gallery to the category pages:
 * /blocks#pricing to /blocks/pricing, /blocks#pricing-01 to
 * /blocks/pricing#pricing-01.
 */
export function BlocksHashRedirect({ targets }: { targets: Record<string, string> }) {
  const router = useRouter()

  React.useEffect(() => {
    const target = targets[window.location.hash.slice(1)]
    if (target) router.replace(target)
  }, [router, targets])

  return null
}
