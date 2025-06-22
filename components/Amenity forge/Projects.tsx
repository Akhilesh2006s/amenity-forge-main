"use client"
import { PinContainer } from "@/components/3d-pin"
import { motion } from "framer-motion"
import { useState } from "react"

const pinData = [
  {
    title: "Photography Portfolio",
    href: "https://example.com/photography",
    description: "Stunning landscape and portrait photography collection.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Design Studio",
    href: "https://example.com/design",
    description: "Creative design solutions for modern brands.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Tech Blog",
    href: "https://example.com/tech",
    description: "Latest insights on web development and AI.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Travel Journal",
    href: "https://example.com/travel",
    description: "Adventures and stories from around the world.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Food & Recipe",
    href: "https://example.com/food",
    description: "Delicious recipes and culinary experiences.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Fitness Tracker",
    href: "https://example.com/fitness",
    description: "Your personal health and wellness companion.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Music Studio",
    href: "https://example.com/music",
    description: "Professional music production and mixing.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Art Gallery",
    href: "https://example.com/art",
    description: "Contemporary art exhibitions and collections.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Learning Hub",
    href: "https://example.com/learning",
    description: "Interactive courses and educational content.",
    image: "/placeholder.svg?height=160&width=280",
  },
  {
    title: "Business Tools",
    href: "https://example.com/business",
    description: "Productivity tools for modern entrepreneurs.",
    image: "/placeholder.svg?height=160&width=280",
  },
]

export default function AnimatedPinGallery() {
  // Duplicate the array to create seamless loop
  const duplicatedPins = [...pinData, ...pinData]
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen w-full bg-black py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-16">Featured Projects</h1>
        <div className="relative">
          <motion.div
            className="flex gap-8"
            animate={{
              x: isHovered ? undefined : [0, -2400],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {duplicatedPins.map((pin, index) => (
              <div key={index} className="flex-shrink-0">
                <PinContainer title={pin.title} href={pin.href}>
                  <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">{pin.title}</h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500">{pin.description}</span>
                    </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden">
                      <img
                        src={pin.image || "/placeholder.svg"}
                        alt={pin.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </PinContainer>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
