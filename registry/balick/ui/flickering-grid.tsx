"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface FlickeringGridProps extends React.ComponentProps<"canvas"> {
  /** Side of a square, in pixels. */
  squareSize?: number
  /** Space between two squares, in pixels. */
  gap?: number
  /** Share of the squares that change in one second, from 0 to 1. */
  flickerChance?: number
  /** Opacity of the brightest square, from 0 to 1. */
  maxOpacity?: number
}

/**
 * A field of small squares that flicker at random, drawn on a canvas that
 * fills its positioned parent. The squares take the text color. The canvas
 * stops drawing while it is off screen, and stands still under reduced
 * motion.
 */
export function FlickeringGrid({
  squareSize = 4,
  gap = 6,
  flickerChance = 0.3,
  maxOpacity = 0.3,
  className,
  ...props
}: FlickeringGridProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const cell = squareSize + gap
    let columns = 0
    let rows = 0
    let opacities = new Float32Array(0)
    let frame = 0
    let last = 0
    let visible = true

    function draw() {
      const ratio = window.devicePixelRatio || 1
      context!.clearRect(0, 0, canvas!.width, canvas!.height)
      // Read the color every frame, so the squares follow a theme change.
      context!.fillStyle = getComputedStyle(canvas!).color
      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          context!.globalAlpha = opacities[column * rows + row]
          context!.fillRect(
            column * cell * ratio,
            row * cell * ratio,
            squareSize * ratio,
            squareSize * ratio
          )
        }
      }
      context!.globalAlpha = 1
    }

    function resize() {
      const ratio = window.devicePixelRatio || 1
      const { width, height } = canvas!.getBoundingClientRect()
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      columns = Math.ceil(width / cell)
      rows = Math.ceil(height / cell)
      opacities = new Float32Array(columns * rows).map(() => Math.random() * maxOpacity)
      draw()
    }

    function tick(time: number) {
      const elapsed = Math.min((time - last) / 1000, 0.1)
      last = time
      for (let index = 0; index < opacities.length; index++) {
        if (Math.random() < flickerChance * elapsed) opacities[index] = Math.random() * maxOpacity
      }
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

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)
    resize()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [squareSize, gap, flickerChance, maxOpacity])

  return (
    <canvas
      ref={canvasRef}
      data-slot="flickering-grid"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full text-foreground", className)}
      {...props}
    />
  )
}
