"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const memories = [
  { id: 1, title: "Here was your iconic moment #1", emoji: "🌟" },
  { id: 2, title: "Insert cringe pic here 📸", emoji: "😬" },
  { id: 3, title: "A wild Eli appeared!", emoji: "👾" },
  { id: 4, title: "Remember this disaster?", emoji: "🙈" },
  { id: 5, title: "Epic friendship moment", emoji: "🤝" },
  { id: 6, title: "That time you...", emoji: "🤣" },
]

export function PhotoMemoryWall() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 300
    const currentScroll = scrollContainerRef.current.scrollLeft

    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative py-6">
      <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Photo Memory Wall</h3>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md text-pink-600 hover:text-pink-700"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md text-pink-600 hover:text-pink-700"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 px-8 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {memories.map((memory) => (
          <div key={memory.id} className="flex-shrink-0 w-64 snap-center">
            <div className="bg-white rounded-lg shadow-lg p-3 transform transition-transform hover:scale-105">
              {/* Photo frame */}
              <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center mb-3 overflow-hidden relative">
                <div className="text-5xl absolute">{memory.emoji}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Caption */}
              <p className="text-center font-medium text-gray-800">{memory.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-2 text-sm text-gray-600">
        <p>Swipe or use arrows to see more memories</p>
      </div>
    </div>
  )
}
