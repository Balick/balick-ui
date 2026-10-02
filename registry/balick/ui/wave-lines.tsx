"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface WaveLinesProps extends React.ComponentProps<"canvas"> {
  /** Number of lines. */
  lines?: number
  /** Height of the waves, in pixels. */
  amplitude?: number
  /** Speed of the waves: 2 is twice as fast. */
  speed?: number
  /** Let the lines part around the pointer. */
  interactive?: boolean
}

/**
 * Thin lines that ripple like silk, drawn on a canvas that fills its
 * positioned parent. The lines take the text color and part around the
 * pointer over that parent. The canvas stops drawing while it is off screen,
 * and stands still under reduced motion.
 */
export function WaveLines({
  lines = 36,
  amplitude = 28,
  speed = 1,
  interactive = true,
  className,
  ...props
}: WaveLinesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    const parent = canvas?.parentElement
    if (!canvas || !context || !parent) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let time = 0
    let last = 0
    // The pointer, eased so the lines settle smoothly; strength fades it in and out.
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, target: 0 }

    function draw() {
      const ratio = window.devicePixelRatio || 1
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
      context!.clearRect(0, 0, width, height)
      context!.strokeStyle = getComputedStyle(canvas!).color
      context!.lineWidth = 1
      const gap = height / lines
      const reach = Math.min(width, height) / 4
      for (let line = 0; line < lines; line++) {
        const base = (line + 0.5) * gap
        // Lines in the middle are brighter than those at the edges.
        context!.globalAlpha = 0.12 + 0.38 * Math.sin((Math.PI * (line + 0.5)) / lines)
        context!.beginPath()
        for (let x = -8; x <= width + 8; x += 8) {
          let y =
            base +
            amplitude * Math.sin(x * 0.004 + time * 0.6 + line * 0.18) * Math.cos(x * 0.0017 - time * 0.35 + line * 0.07) +
            amplitude * 0.35 * Math.sin(x * 0.011 - time * 0.9 + line * 0.33)
          if (pointer.strength > 0.001) {
            const dx = x - pointer.x
            const dy = y - pointer.y
            const falloff = Math.exp(-(dx * dx + dy * dy) / (2 * reach * reach))
            y += Math.sign(dy || 1) * falloff * reach * 0.6 * pointer.strength
          }
          if (x === -8) context!.moveTo(x, y)
          else context!.lineTo(x, y)
        }
        context!.stroke()
      }
      context!.globalAlpha = 1
    }

    function resize() {
      const ratio = window.devicePixelRatio || 1
      const bounds = canvas!.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      draw()
    }

    function tick(now: number) {
      const elapsed = Math.min((now - last) / 1000, 0.1)
      last = now
      time += elapsed * speed
      const ease = 1 - Math.exp(-elapsed * 6)
      pointer.x += (pointer.targetX - pointer.x) * ease
      pointer.y += (pointer.targetY - pointer.y) * ease
      pointer.strength += (pointer.target - pointer.strength) * ease
      draw()
      frame = requestAnimationFrame(tick)
    }

    function start() {
      if (reduceMotion || !visible || frame) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect()
      pointer.targetX = event.clientX - bounds.left
      pointer.targetY = event.clientY - bounds.top
      if (pointer.target === 0) {
        pointer.x = pointer.targetX
        pointer.y = pointer.targetY
      }
      pointer.target = 1
    }
    function onPointerLeave() {
      pointer.target = 0
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)
    if (interactive && !reduceMotion) {
      parent.addEventListener("pointermove", onPointerMove)
      parent.addEventListener("pointerleave", onPointerLeave)
    }
    resize()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      parent.removeEventListener("pointermove", onPointerMove)
      parent.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [lines, amplitude, speed, interactive])

  return (
    <canvas
      ref={canvasRef}
      data-slot="wave-lines"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full text-foreground", className)}
      {...props}
    />
  )
}
