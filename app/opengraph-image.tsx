import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = "Balick UI: blocks for shadcn/ui, designed to fit together"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const fonts = join(process.cwd(), "assets/fonts")

const ink = "#000411"
const paper = "#F0EFF4"
const rule = "rgba(240, 239, 244, 0.1)"
const mark = "rgba(240, 239, 244, 0.45)"

/** Rails of the sheet, and the rows ruled around the text (top and bottom, in px). */
const rails = [72, 1128]
const rows = [
  [96, 150],
  [196, 300],
  [300, 404],
  [404, 488],
]

function Mark({ x, y }: { x: number; y: number }) {
  return (
    <div style={{ position: "absolute", left: x - 6, top: y - 6, width: 13, height: 13, display: "flex" }}>
      <div style={{ position: "absolute", left: 6, top: 0, width: 1, height: 13, background: mark }} />
      <div style={{ position: "absolute", left: 0, top: 6, width: 13, height: 1, background: mark }} />
    </div>
  )
}

export default async function OpengraphImage() {
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(fonts, "Geist-Regular.ttf")),
    readFile(join(fonts, "Geist-SemiBold.ttf")),
    readFile(join(fonts, "GeistMono-Regular.ttf")),
  ])
  const lines = [...new Set(rows.flat())]

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          background: ink,
          color: paper,
          fontFamily: "Geist",
        }}
      >
        {rails.map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 0, width: 1, height: 630, background: rule }} />
        ))}
        {lines.map((y) => (
          <div key={y} style={{ position: "absolute", left: 0, top: y, width: 1200, height: 1, background: rule }} />
        ))}
        {rails.flatMap((x) => [lines[0], lines[lines.length - 1]].map((y) => <Mark key={`${x}-${y}`} x={x} y={y} />))}

        <div style={{ position: "absolute", left: 104, top: 100, display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 24 24">
            <rect x="2" y="2" width="13" height="13" rx="3" fill={paper} />
            <rect x="9.75" y="9.75" width="12.25" height="12.25" rx="3" fill="none" stroke={paper} strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>{siteConfig.name}</span>
        </div>
        <div style={{ position: "absolute", left: 100, top: 200, fontSize: 92, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          Blocks designed
        </div>
        <div style={{ position: "absolute", left: 100, top: 304, fontSize: 92, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          to fit together.
        </div>
        <div style={{ position: "absolute", left: 104, top: 424, fontSize: 30, color: "#A3A3B0" }}>
          Compose a page for shadcn/ui, install it in one command.
        </div>
        <div style={{ position: "absolute", left: 104, top: 540, fontFamily: "Geist Mono", fontSize: 22, color: "rgba(240, 239, 244, 0.5)" }}>
          {new URL(siteConfig.url).host}
        </div>
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
