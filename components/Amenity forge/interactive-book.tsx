"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function ComicBookReader() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTime = useRef(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const pages = [
    {
      title: "Page 1",
      leftPage: {
        background: "2.jpg"
      },
      rightPage: {
        background: "3.jpg"
      }
    },
    {
      title: "Page 2",
      leftPage: {
        background: "4.jpg"
      },
      rightPage: {
        background: "5.jpg"
      }
    },
    {
      title: "Page 3",
      leftPage: {
        background: "6.jpg"
      },
      rightPage: {
        background: "7.jpg"
      }
    }
  ]

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()

    const now = Date.now()
    if (now - lastScrollTime.current < 500 || isFlipping || isOpening) return
    lastScrollTime.current = now

    if (e.deltaY > 0) {
      if (currentPage < pages.length - 1) {
        setFlipDirection("next")
        setIsFlipping(true)
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1)
          setTimeout(() => setIsFlipping(false), 300)
        }, 300)
      } else {
        setIsFlipping(true)
        setTimeout(() => {
          setIsOpen(false)
          setCurrentPage(0)
          setIsFlipping(false)
        }, 500)
      }
    } else {
      if (currentPage > 0) {
        setFlipDirection("prev")
        setIsFlipping(true)
        setTimeout(() => {
          setCurrentPage((prev) => prev - 1)
          setTimeout(() => setIsFlipping(false), 300)
        }, 300)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      const bookElement = document.getElementById("book-container")
      if (bookElement) {
        bookElement.addEventListener("wheel", handleScroll, { passive: false })
        return () => bookElement.removeEventListener("wheel", handleScroll)
      }
    }
  }, [isOpen, currentPage, isFlipping, isOpening])

  const openBook = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }

    setIsOpening(true)
    setIsOpen(true)
    setCurrentPage(0)

    setTimeout(() => {
      setIsOpening(false)
    }, 1000)
  }

  const renderPage = (pageData: any) => {
    if (!pageData) return null

    return (
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${pageData.background})`,
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black p-4 sm:p-8 md:p-20 pt-16 sm:pt-24 md:pt-32">
      <div className="mb-8 text-center">
        <h1 className="text-7xl lg:text-7xl font-bold mb-20 leading-tight max-w-7xl mx-auto text-yellow-400">
          OUR COMPANY BROCHURE
        </h1>
      </div>

      <div className="relative">
        {!isOpen ? (
          <div
            className="cursor-pointer transform perspective-1000 transition-all duration-500"
            onClick={openBook}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: isHovered ? "rotateZ(-15deg) rotateY(10deg) scale(1.05)" : "rotateZ(0deg) scale(1)",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <Card className="w-full sm:w-[400px] md:w-[500px] h-[700px] sm:h-[750px] md:h-[700px] shadow-2xl relative overflow-hidden border-4 border-yellow-500 bg-white">
              <div className="absolute inset-0">
                <img src="1.jpg" alt="Brochure Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-yellow-900/30"></div>
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-white">
                <div className="text-yellow-300 text-xs sm:text-sm bg-black/70 px-4 py-1 rounded-full backdrop-blur-sm border border-yellow-300/30">
                  Click to explore • Scroll to turn pages
                </div>
              </div>
              <div className="absolute right-0 top-0 w-3 h-full bg-gradient-to-l from-yellow-600 to-yellow-400 shadow-inner"></div>
              <div className="absolute right-3 top-0 w-1 h-full bg-yellow-500"></div>
            </Card>
          </div>
        ) : (
          <div id="book-container" className="relative cursor-grab active:cursor-grabbing">
            <Card
              className={`w-full sm:w-[500px] md:w-[800px] h-[700px] sm:h-[750px] md:h-[700px] bg-white shadow-2xl relative overflow-hidden border-4 border-yellow-500 transition-all duration-1000 ${isOpening ? "animate-book-open" : ""}`}
            >
              <div className="absolute left-1/2 top-0 w-2 h-full bg-yellow-600 transform -translate-x-1/2 z-20 shadow-lg"></div>

              {isOpening && (
                <div className="absolute inset-0 z-30">
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-white origin-right animate-page-turn-left shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-r from-yellow-100 to-yellow-50 flex items-center justify-center">
                      <div className="text-gray-600 text-lg font-serif">Opening...</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full border-r border-yellow-200 relative overflow-hidden">
                  {renderPage(pages[currentPage]?.leftPage)}
                </div>

                <div className="w-1/2 h-full relative overflow-hidden">
                  {renderPage(pages[currentPage]?.rightPage)}
                </div>
              </div>

              {isFlipping && !isOpening && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {flipDirection === "next" ? (
                    <div className="absolute right-0 top-0 w-1/2 h-full origin-left animate-flip-next shadow-2xl relative overflow-hidden">
                      <div className="transform scale-x-[-1] w-full h-full">
                        {currentPage < pages.length && renderPage(pages[currentPage]?.rightPage)}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute left-0 top-0 w-1/2 h-full origin-right animate-flip-prev shadow-2xl relative overflow-hidden">
                      {renderPage(pages[currentPage]?.leftPage)}
                    </div>
                  )}
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-100 z-30">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((currentPage + 1) / pages.length) * 100}%`,
                    backgroundColor: "#FFD700",
                  }}
                ></div>
              </div>
            </Card>

            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-yellow-300 text-xs sm:text-sm font-medium">
                Scroll down for next page • Scroll up for previous page
              </p>
              <p className="text-yellow-400 text-xs mt-1">
                Page {currentPage + 1} of {pages.length}
              </p>
            </div>
          </div>
        )}
      </div>

      <audio ref={audioRef} preload="auto">
        <source src="/book.mp4" type="audio/mp4" />
        <source src="/book.m4a" type="audio/mp4" />
      </audio>

      <style jsx global>{`
        @keyframes flip-next {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(-90deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }
        
        @keyframes flip-prev {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(90deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(180deg);
            opacity: 0;
          }
        }

        @keyframes page-turn-left {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }

        @keyframes book-open {
          0% {
            transform: scale(0.8) rotateX(10deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        
        .animate-flip-next {
          animation: flip-next 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-flip-prev {
          animation: flip-prev 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-page-turn-left {
          animation: page-turn-left 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-book-open {
          animation: book-open 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        #book-container {
          perspective: 1200px;
        }
      `}</style>
    </div>
  )
}
