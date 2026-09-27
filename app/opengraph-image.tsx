import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = "Balick UI: components, blocks and templates for shadcn/ui"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const fonts = join(process.cwd(), "assets/fonts")

export default async function OpengraphImage() {
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(fonts, "Geist-Regular.ttf")),
    readFile(join(fonts, "Geist-SemiBold.ttf")),
    readFile(join(fonts, "GeistMono-Regular.ttf")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#000",
          color: "#fff",
          fontFamily: "Geist",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24">
            <rect x="2" y="2" width="13" height="13" rx="3" fill="#fff" />
            <rect x="9.75" y="9.75" width="12.25" height="12.25" rx="3" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            {siteConfig.name}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 900 }}
          >
            Build interfaces that feel crafted.
          </span>
          <span style={{ marginTop: 28, fontSize: 32, color: "rgba(255,255,255,0.6)", maxWidth: 860 }}>
            Components, blocks and templates for shadcn/ui. Compose a page, install it in one command.
          </span>
        </div>
        <span style={{ fontFamily: "Geist Mono", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>
          {new URL(siteConfig.url).host}
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  )
}
