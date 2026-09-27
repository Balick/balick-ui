import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24">
          <rect x="2" y="2" width="13" height="13" rx="3" fill="#fff" />
          <rect x="9.75" y="9.75" width="12.25" height="12.25" rx="3" fill="none" stroke="#fff" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    size
  )
}
