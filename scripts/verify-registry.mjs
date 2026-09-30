#!/usr/bin/env node
/*
 * Installs every registry item into fresh projects and emulates "Open in v0".
 *
 *   pnpm registry:verify                  build this site, then run every check
 *   pnpm registry:verify --only radix     one check: radix, base or v0
 *   pnpm registry:verify --url https://ui.balick.me
 *                                         check a deployed site instead of building one
 *   pnpm registry:verify --keep           keep the temporary projects
 *
 * Checks (each in a fresh Next.js project, with `next build` prerendering one
 * page per block and per demo, so render errors show up too):
 *
 * - radix, base: `shadcn init` with that style, then `shadcn add` of every item,
 *   exactly what a user does.
 * - v0: what "Open in v0" does with /r/v0/<name>.json. v0 cannot be driven from
 *   here (it needs an account), so this emulates what we have seen of it:
 *   files are written at their `target`; `css`, `cssVars` and `envVars` are
 *   ignored; only the documented item types are understood; and when an item
 *   has no page, v0 generates one that runs
 *   `import Component from '<first file>'`. That last rule is the error
 *   "Export default doesn't exist in target module" of a block with a named
 *   export only. It does not replace opening a few items in v0 by hand.
 */
import { spawn } from "node:child_process"
import http from "node:http"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

const args = process.argv.slice(2)
const option = (name) => {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? undefined : args[index + 1]
}
const only = option("only")
const remoteUrl = option("url")?.replace(/\/$/, "")
const keep = args.includes("--keep")
const port = Number(option("port") ?? 4310)

if (only && !["radix", "base", "v0"].includes(only)) {
  console.error("--only expects radix, base or v0")
  process.exit(2)
}

// Loopback traffic must never go through a proxy; everything else may need one.
for (const key of ["NO_PROXY", "no_proxy"]) {
  process.env[key] = [process.env[key], "127.0.0.1", "localhost"].filter(Boolean).join(",")
}
http.setGlobalProxyFromEnv?.()

const started = Date.now()
const log = (message) =>
  console.log(`\n▶ ${message} (${Math.round((Date.now() - started) / 1000)}s)`)

const results = []
const fail = (stage, item, message) => results.push({ stage, item, message })
const pascal = (name) =>
  name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")

// ---------------------------------------------------------------- commands

/**
 * Runs a command without blocking the event loop: the proxy below lives in
 * this process and must keep answering while `shadcn add` fetches from it.
 */
function run(command, commandArgs, { cwd, env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, commandArgs, {
      cwd,
      env: { ...process.env, ...env },
      shell: process.platform === "win32",
    })
    let output = ""
    const collect = (chunk) => {
      output = (output + chunk).slice(-200_000)
    }
    child.stdout.on("data", collect)
    child.stderr.on("data", collect)
    const timer = setTimeout(() => child.kill(), 15 * 60 * 1000)
    child.on("error", (error) => {
      clearTimeout(timer)
      resolve({ ok: false, output: String(error) })
    })
    child.on("close", (status) => {
      clearTimeout(timer)
      resolve({ ok: status === 0, output })
    })
  })
}

/** Runs a command that must succeed, retrying network hiccups once. */
async function mustRun(command, commandArgs, options) {
  let last
  for (let attempt = 0; attempt < 2; attempt++) {
    last = await run(command, commandArgs, options)
    if (last.ok) return last.output
  }
  const tail = last.output.split("\n").slice(-25).join("\n")
  throw new Error(`${command} ${commandArgs.join(" ")}\n${tail}`)
}

// -------------------------------------------------------------------- site

async function waitFor(url, timeout = 90_000) {
  const end = Date.now() + timeout
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`${url} did not answer within ${timeout / 1000}s`)
}

/**
 * The registry files name their dependencies by their production address
 * (https://ui.balick.me/r/...). A local check must not fetch them from there,
 * so this proxy serves the local site and rewrites that address to its own.
 */
function startProxy(publicUrl, listenPort, targetPort) {
  const production = "https://ui.balick.me"
  const server = http.createServer((request, response) => {
    const upstream = http.request(
      {
        host: "127.0.0.1",
        port: targetPort,
        path: request.url,
        method: request.method,
        headers: { ...request.headers, "accept-encoding": "identity" },
      },
      (answer) => {
        if (!/json|text/.test(answer.headers["content-type"] ?? "")) {
          response.writeHead(answer.statusCode, answer.headers)
          answer.pipe(response)
          return
        }
        const chunks = []
        answer.on("data", (chunk) => chunks.push(chunk))
        answer.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8").split(production).join(publicUrl)
          const headers = { ...answer.headers }
          delete headers["content-length"]
          delete headers["content-encoding"]
          response.writeHead(answer.statusCode, headers)
          response.end(body)
        })
      }
    )
    upstream.on("error", () => {
      response.writeHead(502)
      response.end()
    })
    request.pipe(upstream)
  })
  return new Promise((resolve) => server.listen(listenPort, "127.0.0.1", () => resolve(server)))
}

async function startSite() {
  if (remoteUrl) return { url: remoteUrl, stop() {} }

  // The site listens on port + 1; the proxy in front of it is the address everything uses.
  const url = `http://127.0.0.1:${port}`
  const env = { NEXT_PUBLIC_BASE_URL: url, NEXT_DIST_DIR: ".next-verify" }
  log("Building the registry and the site")
  await mustRun("pnpm", ["registry:build"])
  await mustRun("pnpm", ["build"], { env })
  const server = spawn("pnpm", ["exec", "next", "start", "-p", String(port + 1)], {
    env: { ...process.env, ...env },
    stdio: "ignore",
    detached: process.platform !== "win32",
    shell: process.platform === "win32",
  })
  await waitFor(`http://127.0.0.1:${port + 1}/r/registry.json`)
  const proxy = await startProxy(url, port, port + 1)
  return {
    url,
    stop() {
      proxy.close()
      try {
        process.kill(-server.pid)
      } catch {
        server.kill()
      }
    },
  }
}

const cache = new Map()
async function getJson(url) {
  if (!cache.has(url)) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${url} answered ${response.status}`)
    cache.set(url, await response.json())
  }
  return cache.get(url)
}

// ---------------------------------------------------------------- projects

async function createProject(work, name, base) {
  await mustRun(
    "npx",
    [
      "-y", "create-next-app@15", name,
      "--ts", "--tailwind", "--eslint", "--app", "--no-src-dir",
      "--import-alias", "@/*", "--use-npm", "--turbopack", "--yes",
    ],
    { cwd: work }
  )
  const dir = path.join(work, name)
  await mustRun("npx", ["-y", "shadcn@latest", "init", "-t", "next", "-b", base, "-p", "nova", "-y"], {
    cwd: dir,
  })
  return dir
}

function writeFile(dir, file, content) {
  const target = path.join(dir, file)
  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, content)
}

const blockPage = (name) =>
  `import { ${pascal(name)} } from "@/components/${name}"\n\nexport default function Page() {\n  return <${pascal(name)} />\n}\n`
const demoPage = (name) =>
  `import Demo from "@/components/${name}"\n\nexport default function Page() {\n  return <Demo />\n}\n`

/** The item a `tsc` error belongs to, from the page or component it is in. */
function ownerOf(file) {
  const match = file.match(/app\/(?:verify|entry|auto)\/([^/]+)\//) ?? file.match(/components\/([^/.]+)\./)
  return match ? match[1] : file
}

/** Typechecks and builds a project, attributing errors to items. */
async function checkProject(dir, stage) {
  const tsc = await run("npx", ["tsc", "--noEmit"], { cwd: dir })
  if (!tsc.ok) {
    const seen = new Set()
    for (const line of tsc.output.split("\n")) {
      const match = line.match(/^(.+?)\(\d+,\d+\): error (TS\d+): (.*)$/)
      if (!match) continue
      const message = `${match[2]} ${match[3]}`
      const key = `${ownerOf(match[1])}|${message}`
      if (seen.has(key)) continue
      seen.add(key)
      fail(stage, ownerOf(match[1]), message)
    }
    if (!seen.size) fail(stage, "typecheck", tsc.output.split("\n").slice(-10).join("\n"))
    return
  }
  const build = await run("npm", ["run", "build"], { cwd: dir })
  if (!build.ok) fail(stage, "build", build.output.split("\n").slice(-30).join("\n"))
}

// ------------------------------------------------------------- real installs

async function checkInstall(base, site, items, work) {
  const stage = `install (${base})`
  log(`Installing every item into a fresh ${base} project`)
  try {
    const dir = await createProject(work, `install-${base}`, base)
    await mustRun(
      "npx",
      ["-y", "shadcn@latest", "add", ...items.map((item) => `${site}/r/${item.name}.json`), "-y", "-o"],
      { cwd: dir }
    )

    const css = readFileSync(path.join(dir, "app/globals.css"), "utf8")
    for (const needle of ["@keyframes marquee", "@keyframes shimmer-spin", "--animate-marquee", "--animate-shimmer-spin"]) {
      if (!css.includes(needle)) fail(stage, "globals.css", `the installed CSS lacks ${needle}`)
    }

    for (const item of items) {
      if (item.type === "registry:block") writeFile(dir, `app/verify/${item.name}/page.tsx`, blockPage(item.name))
      if (item.type === "registry:example") writeFile(dir, `app/verify/${item.name}/page.tsx`, demoPage(item.name))
    }
    log(`Typechecking and building the ${base} project`)
    await checkProject(dir, stage)
  } catch (error) {
    fail(stage, "setup", error.message)
  }
}

// ------------------------------------------------------------- v0 emulation

const v0Types = new Set([
  "registry:block", "registry:component", "registry:ui", "registry:page",
  "registry:file", "registry:hook", "registry:lib",
])
const composeSample = "navbar-01,hero-01,pricing-01,faq-01,stats-01,footer-01"

/** Problems with the shape of a v0 variant. */
function checkFormat(item, { entry, site }) {
  const problems = []
  if (!v0Types.has(item.type)) problems.push(`item type ${item.type} is not one v0 documents`)
  for (const key of ["css", "cssVars", "envVars", "tailwind"]) {
    if (key in item) problems.push(`${key} is not supported by Open in v0`)
  }
  // v0 does not resolve a bare name such as "input": only URLs of v0 variants.
  for (const dependency of item.registryDependencies ?? []) {
    if (!dependency.startsWith(`${site}/r/v0/deps/`) && !dependency.startsWith(`${site}/r/v0/shadcn/`)) {
      problems.push(`dependency ${dependency} is not the URL of a v0 variant`)
    }
  }
  for (const file of item.files ?? []) {
    if (!v0Types.has(file.type)) problems.push(`file ${file.path} has type ${file.type}`)
    if (!file.target) problems.push(`file ${file.path} has no target`)
    if (/@\/registry\//.test(file.content ?? "")) problems.push(`file ${file.path} still imports @/registry/`)
  }
  const pages = (item.files ?? []).filter((file) => file.type === "registry:page")
  if (entry) {
    if (pages.length !== 1 || pages[0].target !== "app/page.tsx") {
      problems.push("an entry needs exactly one registry:page file, at app/page.tsx")
    }
  } else if (pages.length) {
    problems.push("a dependency must not include a page")
  }
  return problems
}

/** Whether the item, or anything it depends on, ships CSS that v0 would drop. */
async function shipsCss(site, name, seen = new Set()) {
  if (seen.has(name)) return []
  seen.add(name)
  const item = await getJson(`${site}/r/${name}.json`)
  const own = item.css || item.cssVars?.theme ? [item] : []
  const nested = await Promise.all(
    (item.registryDependencies ?? [])
      .filter((dependency) => dependency.startsWith("http"))
      .map((dependency) => shipsCss(site, dependency.split("/").pop().replace(/\.json$/, ""), seen))
  )
  return [...own, ...nested.flat()]
}

async function checkV0(site, items, work) {
  const entries = items
    .filter((item) => item.type === "registry:block" || item.type === "registry:example")
    .map((item) => ({ name: item.name, url: `${site}/r/v0/${item.name}.json` }))
  await emulateV0(site, "v0", "v0", entries, work)
  // v0 opens one item per project. A composed page has its own, because it
  // depends on the very blocks that are entries above, in another variant.
  const compose = { name: "compose", url: `${site}/r/v0/compose/${composeSample}.json`, compose: true }
  await emulateV0(site, "v0 (composition)", "v0-compose", [compose], work)
}

/** Opens `entries` the way v0 does, all in one project: they must not collide. */
async function emulateV0(site, stage, projectName, entries, work) {
  log(`Emulating Open in v0: ${stage}`)
  const files = new Map() // target -> { content, from }
  const npmDependencies = new Set()
  const pages = [] // [route, source]

  const place = (file, from) => {
    if (!file.target) return
    const previous = files.get(file.target)
    if (previous && previous.content !== file.content) {
      fail(stage, from, `${file.target} is written twice with different content (also by ${previous.from})`)
    } else {
      files.set(file.target, { content: file.content, from })
    }
  }

  // Dependencies are placed once, however many entries need them.
  const dependencyInfo = new Map() // url -> { npm, shadcn, urls }
  async function loadDependency(url, owner) {
    if (dependencyInfo.has(url)) return dependencyInfo.get(url)
    const item = await getJson(url)
    const name = url.split("/").pop().replace(/\.json$/, "")
    for (const problem of checkFormat(item, { entry: false, site })) fail(stage, name, problem)
    for (const file of item.files ?? []) place(file, owner)
    const info = { npm: new Set(item.dependencies ?? []), urls: [] }
    dependencyInfo.set(url, info)
    info.urls.push(...(item.registryDependencies ?? []).filter((dependency) => dependency.startsWith("http")))
    return info
  }
  /** Everything an entry needs: its own dependencies, and theirs in turn. */
  async function collectNeeds(item, owner) {
    const needs = { npm: new Set(item.dependencies ?? []) }
    const queue = (item.registryDependencies ?? []).filter((dependency) => dependency.startsWith("http"))
    const seen = new Set()
    while (queue.length) {
      const url = queue.shift()
      if (seen.has(url)) continue
      seen.add(url)
      const info = await loadDependency(url, owner)
      info.npm.forEach((name) => needs.npm.add(name))
      queue.push(...info.urls)
    }
    return needs
  }

  for (const entry of entries) {
    try {
      const item = await getJson(entry.url)
      for (const problem of checkFormat(item, { entry: true, site })) fail(stage, entry.name, problem)

      const page = (item.files ?? []).find((file) => file.type === "registry:page")
      for (const file of item.files ?? []) if (file !== page) place(file, entry.name)
      const needs = await collectNeeds(item, entry.name)
      needs.npm.forEach((name) => npmDependencies.add(name))

      if (page) {
        pages.push([`entry/${entry.name}`, page.content])
        const cssItems = entry.compose
          ? (await Promise.all(composeSample.split(",").map((name) => shipsCss(site, name)))).flat()
          : await shipsCss(site, entry.name)
        if (cssItems.length && !page.content.includes("@keyframes")) {
          fail(stage, entry.name, `uses ${cssItems.map((i) => i.name).join(", ")}, which need CSS, but the page does not carry it`)
        }
        if (needs.npm.has("next-themes") && !page.content.includes("ThemeProvider")) {
          fail(stage, entry.name, "depends on next-themes but the page has no ThemeProvider")
        }
      }
      // With a page, v0 uses it. Without one, or if it ignored ours, v0 generates
      // its own: a default import of the first file.
      const main = (item.files ?? []).find((file) => file !== page)
      if (main?.target) {
        const modulePath = main.target.replace(/\.tsx?$/, "")
        pages.push([
          `auto/${entry.name}`,
          `import Component from '@/${modulePath}'\n\nexport default function Page() {\n  return (\n    <main>\n      <Component />\n    </main>\n  )\n}\n`,
        ])
      }
    } catch (error) {
      fail(stage, entry.name, error.message)
    }
  }

  try {
    const dir = await createProject(work, projectName, "radix")
    for (const [target, { content }] of files) writeFile(dir, target, content)
    for (const [route, source] of pages) writeFile(dir, `app/${route}/page.tsx`, source)
    if (npmDependencies.size) await mustRun("npm", ["install", ...npmDependencies], { cwd: dir })
    log(`Typechecking and building the ${stage} project`)
    await checkProject(dir, stage)
  } catch (error) {
    fail(stage, "setup", error.message)
  }
}

// -------------------------------------------------------------------- main

const site = await startSite()
const work = mkdtempSync(path.join(tmpdir(), "balick-verify-"))
try {
  const { items } = await getJson(`${site.url}/r/registry.json`)
  console.log(`Checking ${items.length} items from ${site.url}`)
  if (!only || only === "radix") await checkInstall("radix", site.url, items, work)
  if (!only || only === "base") await checkInstall("base", site.url, items, work)
  if (!only || only === "v0") await checkV0(site.url, items, work)
} finally {
  site.stop()
  if (!remoteUrl) rmSync(".next-verify", { recursive: true, force: true })
  if (keep) console.log(`\nProjects kept in ${work}`)
  else rmSync(work, { recursive: true, force: true })
}

console.log(`\n${"=".repeat(70)}`)
if (!results.length) {
  console.log("All checks passed.")
} else {
  const unique = [...new Map(results.map((r) => [`${r.stage}|${r.item}|${r.message}`, r])).values()]
  for (const stage of [...new Set(unique.map((r) => r.stage))]) {
    const rows = unique.filter((r) => r.stage === stage)
    console.log(`\n✖ ${stage}: ${new Set(rows.map((r) => r.item)).size} item(s)`)
    for (const row of rows) console.log(`  - ${row.item}: ${row.message}`)
  }
}
process.exit(results.length ? 1 : 0)
