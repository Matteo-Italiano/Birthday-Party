"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function AiFail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const images = [
    {
      id: 1,
      alt: "AI Fail Image Matteo",
      src:'/public/image.png'
    },
    {
      id: 2,
      alt: "AI Fail Image Eli",
      src: '/public/th.png'
    },
  ]

  const nextSlide = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg overflow-hidden">
      <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">The AI Fail</h3>

      <div className="relative mb-4">
        {/* Gallery navigation */}
        <div className="flex justify-center mb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                activeIndex === index ? "bg-pink-500" : "bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image container */}
        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="aspect-w-16 aspect-h-9">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md text-pink-600 hover:text-pink-700"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md text-pink-600 hover:text-pink-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-800">
          This is what happened when we tried to generate a photo of us using AI… Never again 😭
        </p>
      </div>
    </div>
  )
}
