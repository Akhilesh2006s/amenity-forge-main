"use client"

import { cn } from "@/lib/utils"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import React, { useMemo, useRef } from "react"
import * as THREE from "three"

export const CanvasRevealEffect = ({
  animationSpeed = 0.3,
  opacities = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1],
  colors = [
    [255, 215, 0],  // Mid Gold - #FFD700
    [248, 228, 92], // Highlight Gold - #F8E45C
    [240, 196, 0],  // Deep Gold
  ],
  containerClassName,
  dotSize = 4,
  showGradient = true,
}: {
  animationSpeed?: number
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
}) => {
  return (
    <div className={cn("h-full w-full relative", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={opacities}
          shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
            opacity *= step(intro_offset, u_time * animation_speed_factor);
            opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/60 via-[#F8E45C]/50 to-transparent z-10 pointer-events-none" />
      )}
    </div>
  )
}

interface DotMatrixProps {
  colors?: number[][]
  opacities?: number[]
  totalSize?: number
  dotSize?: number
  shader?: string
  center?: ("x" | "y")[]
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors,
  opacities,
  totalSize = 4,
  dotSize = 3,
  shader,
  center = ["x", "y"],
}) => {
  const uniforms = React.useMemo(() => {
    const fillColors =
      colors?.length === 3
        ? [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]]
        : Array(6).fill(colors?.[0] ?? [255, 215, 0])
    return {
      u_colors: {
        value: fillColors.map((c) => [c[0] / 255, c[1] / 255, c[2] / 255]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities ?? [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
        type: "uniform1fv",
      },
      u_total_size: { value: totalSize, type: "uniform1f" },
      u_dot_size: { value: dotSize, type: "uniform1f" },
    }
  }, [colors, opacities, totalSize, dotSize])

  return (
    <Shader
      source={`precision mediump float;
        in vec2 fragCoord;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;

        float random(vec2 xy) {
          return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }

        void main() {
          vec2 st = fragCoord.xy;
          ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));" : ""}
          ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));" : ""}
          float opacity = step(0.0, st.x) * step(0.0, st.y);
          vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
          float frequency = 5.0;
          float show_offset = random(st2);
          float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
          opacity *= u_opacities[int(rand * 10.0)];
          opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
          opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
          vec3 color = u_colors[int(show_offset * 6.0)];
          ${shader}
          fragColor = vec4(color, opacity);
          fragColor.rgb *= fragColor.a;
        }
      `}
      uniforms={uniforms}
      maxFps={60}
    />
  )
}

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number
    type: string
  }
}

const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string
  uniforms: Uniforms
  maxFps?: number
}) => {
  const { size } = useThree()
  const ref = useRef<THREE.Mesh>()
  let lastFrameTime = 0

  useFrame(({ clock }) => {
    if (!ref.current) return
    const timestamp = clock.getElapsedTime()
    if (timestamp - lastFrameTime < 1 / maxFps) return
    lastFrameTime = timestamp
    ;(ref.current.material as any).uniforms.u_time.value = timestamp
  })

  const material = useMemo(() => {
    const prepared: any = {}
    for (const key in uniforms) {
      const { value, type } = uniforms[key]
      if (type === "uniform1fv" || type === "uniform1f") {
        prepared[key] = { value }
      } else if (type === "uniform3fv") {
        prepared[key] = {
          value: (value as number[][]).map((v) => new THREE.Vector3().fromArray(v)),
        }
      } else if (type === "uniform2f") {
        prepared[key] = { value: new THREE.Vector2().fromArray(value as number[]) }
      }
    }
    prepared["u_time"] = { value: 0 }
    prepared["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    }
    return new THREE.ShaderMaterial({
      vertexShader: `
        precision mediump float;
        in vec2 coordinates;
        uniform vec2 u_resolution;
        out vec2 fragCoord;
        void main(){
          gl_Position = vec4(position.xy, 0.0, 1.0);
          fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
          fragCoord.y = u_resolution.y - fragCoord.y;
        }
      `,
      fragmentShader: source,
      uniforms: prepared,
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
      transparent: true,
    })
  }, [size, source])

  return (
    <mesh ref={ref as any}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

const Shader: React.FC<{
  source: string
  uniforms: Uniforms
  maxFps?: number
}> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full z-0">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  )
}
