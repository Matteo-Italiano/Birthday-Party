"use client"

import { useRef, useEffect, useState } from "react"

export function BirthdayScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={scrollRef}
      className={`bg-gradient-to-b from-purple-900 to-purple-700 text-white rounded-xl p-6 shadow-lg transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
      </div>

      <h3
        className={`text-center font-serif text-2xl font-bold mb-6 text-yellow-300 transition-all duration-1000 ${
          isVisible ? "animate-glow" : ""
        }`}
      >
        On this day... a legend was born
      </h3>

      <div className="space-y-4 font-serif leading-relaxed">
        <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-yellow-300 first-letter:float-left first-letter:mr-1">
          In the age of wonders and marvels, when the stars aligned in perfect harmony, the realm of Earth was blessed
          with the arrival of a most extraordinary being. On this very day, thirteen years ago, Eli the Mathematical
          Prodigy entered this mortal plane.
        </p>

        <p>
          The sages foretold of this momentous occasion, whispering prophecies of one whose mind could unravel the most
          complex equations with ease, whose karate skills would become legendary, and whose spirit would bring joy to
          all who crossed his path.
        </p>

        <p>
          As the first cry echoed through the halls, it is said that calculators around the world momentarily displayed
          the digits of pi in perfect sequence, and a double rainbow appeared in the sky. The royal astronomers noted
          that three shooting stars crossed the heavens at that very moment.
        </p>

        <p>
          Young Eli grew in wisdom and stature, mastering the ancient arts of mathematics and martial arts with
          unparalleled skill. By day, he conquered the challenges of school with brilliant strategy; by night, he
          trained in MMA, becoming a formidable warrior. When not calculating or fighting, he could be found riding the
          waves, surfing with the grace of a sea deity.
        </p>

        <p>
          Though the trials of school sometimes weighed heavy upon his shoulders, Eli the Resilient always emerged
          victorious, his genius-level math skills slicing through problems like a hot knife through butter. His
          friends, loyal companions on this epic journey, stood by his side through every adventure.
        </p>

        <p>
          And so, on this day of days, as he turns fourteen, we celebrate not merely the passage of another year, but
          the continuing saga of Eli the Mathematical Warrior, Master of Karate, Conqueror of Algebra, Surfer of Waves,
          and Loyal Friend to All.
        </p>

        <p className="text-center text-yellow-300 font-bold">Long may the legend continue!</p>
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
      </div>
    </div>
  )
}
