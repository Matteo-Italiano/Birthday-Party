"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const carouselItems = [
  {
    title: "Daily Eli Horoscope",
    content: (
      <div className="p-4 bg-purple-100 rounded-lg">
        <h3 className="font-bold text-purple-800 mb-2">⭐ For Today Only ⭐</h3>
        <p className="text-purple-900">
          The stars have aligned to make this your most EPIC birthday yet! Jupiter says you'll receive unexpected gifts,
          while Venus suggests someone might finally laugh at your jokes. Mercury warns: don't eat too much cake, but
          Saturn says IGNORE THAT and live your best life!
        </p>
      </div>
    ),
  },
  {
    title: "Fun Fact of the Year",
    content: (
      <div className="p-4 bg-pink-100 rounded-lg">
        <h3 className="font-bold text-pink-800 mb-2">🤯 Did You Know?🤯</h3>
        <p className="text-pink-900 text-lg font-medium">Eli cheated on an arabic exam once 🐐</p>
        <p className="text-pink-700 mt-2 text-sm">
          This achievement has been recorded in the "Who Can cheat" hall of fame!
        </p>
      </div>
    ),
  },
]

export function BirthdayCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((current) => (current === carouselItems.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? carouselItems.length - 1 : current - 1))
  }

  // For touch swiping
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swiped right
      prevSlide()
    }
  }

  return (
    <div className="relative">
      {/* Carousel navigation */}
      <div className="flex justify-center mb-4">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "w-3 h-3 mx-1 rounded-full transition-colors",
              activeIndex === index ? "bg-pink-500" : "bg-gray-300",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel content */}
      <div
        className="bg-white rounded-xl p-6 shadow-lg min-h-[300px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h3 className="text-xl font-bold text-center mb-4 text-pink-600">{carouselItems[activeIndex].title}</h3>

        <div className="transition-opacity duration-300">{carouselItems[activeIndex].content}</div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="text-center mt-3 text-sm text-gray-600">
        <p>Swipe left or right to see more!</p>
      </div>
    </div>
  )
}
