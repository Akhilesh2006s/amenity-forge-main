// components/GoldRevealCanvas.tsx
"use client"

import React, { useRef, useEffect } from "react"

interface GoldRevealCanvasProps {
  dotSize?: number
  spacing?: number
  interval?: number
}

const GoldRevealCanvas: React.FC<GoldRevealCanvasProps> = ({
  dotSize = 4,
  spacing = 16,
  interval = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const goldShades = ["#FFD700", "#F8E45C", "#CFAE00", "#FFE066", "#FFEB3B"]

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          const color = goldShades[Math.floor(Math.random() * goldShades.length)]
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    draw()
    const loop = setInterval(draw, interval)

    return () => {
      clearInterval(loop)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [dotSize, spacing, interval])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  )
}

export default GoldRevealCanvas
