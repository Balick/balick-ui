// Takes the screenshots of the template cards on /templates, in light and
// dark mode, from a running site:
//
//   pnpm dev                                   # in another terminal
//   node scripts/template-screenshots.mjs      # or pass the site URL
//
// Needs Playwright with Chromium (npx playwright install chromium). Run it
// with the Pro sources in place (see scripts/pro.mjs) so the Pro templates
// are listed, then commit public/templates/*.jpg.
import { mkdirSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "")
const out = path.join(process.cwd(), "public/templates")
const width = 1440
const height = 2400

let chromium
try {
  ;({ chromium } = createRequire(import.meta.url)("playwright"))
} catch {
  console.error("template-screenshots: Playwright is missing. Install it with: npm i -D playwright && npx playwright install chromium")
  process.exit(1)
}

const response = await fetch(`${base}/r/templates.json`)
if (!response.ok) throw new Error(`template-screenshots: ${base}/r/templates.json answered ${response.status}`)
const { templates } = await response.json()
mkdirSync(out, { recursive: true })

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
)
for (const scheme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme })
  for (const template of templates) {
    await page.goto(`${base}/view/compose?blocks=${template.blocks.join(",")}`, { waitUntil: "networkidle", timeout: 180_000 })
    // Hide the Next.js development indicator.
    await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" })
    await page.waitForTimeout(1500)
    // Scroll through the page so the animations that wait to be in view run.
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let top = 0; top < Math.min(total, height + 900); top += 450) {
      await page.evaluate((y) => window.scrollTo(0, y), top)
      await page.waitForTimeout(150)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1500)
    const file = path.join(out, `${template.slug}-${scheme}.jpg`)
    await page.screenshot({ path: file, type: "jpeg", quality: 72, fullPage: true, clip: { x: 0, y: 0, width, height } })
    console.log(path.relative(process.cwd(), file))
  }
  await page.close()
}
await browser.close()
