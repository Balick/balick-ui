"use client"

import * as React from "react"

export const FRAME_HEIGHT_MESSAGE = "balick:frame-height"

/** Tells the parent window how tall this page is, so its iframe can fit it. */
export function FrameHeightReporter() {
  React.useEffect(() => {
    if (window.parent === window) return
    const post = () =>
      window.parent.postMessage(
        {
          type: FRAME_HEIGHT_MESSAGE,
          height: Math.ceil(document.body.getBoundingClientRect().height),
        },
        window.location.origin
      )
    const observer = new ResizeObserver(post)
    observer.observe(document.body)
    post()
    return () => observer.disconnect()
  }, [])

  return null
}
