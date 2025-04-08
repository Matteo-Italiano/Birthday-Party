"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const mathMemories = [
  {
    id: 1,
    title: "",
    description: "",
    src: "/Screenshot_2025-02-15_000336.png"
  },
  {
    id: 2,
    title: "",
    description: "",
    src: "/1740348493580.jpg"
  },
  {
    id: 3,
    title: "",
    description: "",
    src: "/Screenshot_2025-02-15_000354.png"
  },
  {
    id: 4,
    title: "",
    description: "",
    src: "/Screenshot_2025-02-15_000413.png"
  },
  {
    id: 5,
    title: "",
    description: "",
    src: "/1740347085613.jpg"
  },
]

export function MathGallery() {
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
      <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Legendary Math Lessons @ 23:00</h3>

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
        {mathMemories.map((memory) => (
          <div key={memory.id} className="flex-shrink-0 w-64 snap-center">
            <div className="bg-white rounded-lg shadow-lg p-3 transform transition-transform hover:scale-105">
              {/* Image with empty src for user to fill in */}
              <div className="h-48 rounded-md overflow-hidden mb-3">
                <img src="/placeholder.svg" alt={`Math memory ${memory.id}`} className="w-full h-full object-cover" />
              </div>

              {/* Caption */}
              <p className="text-center font-bold text-gray-800">{memory.title}</p>
              <p className="text-center text-sm text-gray-600 mt-1">{memory.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-2 text-sm text-gray-600">
        <p>Swipe or use arrows to see more math memories</p>
      </div>
    </div>
  )
}
