import { blockCategories, blockList } from "@/content/blocks"

/** Categories that have at least one block, in page order, with their blocks. */
export function galleryCategories() {
  return blockCategories
    .map((category) => ({
      ...category,
      blocks: blockList.filter((block) => block.category === category.slug),
    }))
    .filter((category) => category.blocks.length > 0)
}

export function galleryTabs() {
  return galleryCategories().map(({ slug, title, blocks }) => ({
    slug,
    title,
    count: blocks.length,
  }))
}
