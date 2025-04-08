"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export function HiddenSurprise() {
  const [isFound, setIsFound] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Randomly position the hidden element
    const randomizePosition = () => {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Calculate random position (keeping away from edges)
      const x = Math.floor(Math.random() * (viewportWidth - 100)) + 50
      const y = Math.floor(Math.random() * (viewportHeight - 200)) + 100

      setPosition({ x, y })
    }

    randomizePosition()

    // Reposition on window resize
    window.addEventListener("resize", randomizePosition)
    return () => window.removeEventListener("resize", randomizePosition)
  }, [])

  const handleClick = () => {
    setIsFound(true)

    // Trigger confetti explosion
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const closeModal = () => {
    setIsFound(false)
  }

  return (
    <>
      {/* Hidden element */}
      <div
        className="absolute z-10 cursor-pointer text-xl animate-pulse opacity-70 hover:opacity-100"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onClick={handleClick}
      >
        🐸
      </div>

      {/* Surprise modal */}
      {isFound && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <motion.div
            className="bg-gradient-to-b from-purple-600 to-pink-600 rounded-xl p-6 max-w-md w-full text-center shadow-2xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="text-5xl mb-4"
            >
              ✨
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">You found the ultra secret Eli mode!</h3>

            <div className="my-6 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif"
                alt="Dancing celebration"
                className="w-full h-auto"
              />
            </div>

            <p className="text-white mb-6">
              Legend says that those who find the secret frog are blessed with extra birthday luck! 🍀
            </p>

            <button
              onClick={closeModal}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-pink-100 transition-colors"
            >
              Awesome!
            </button>
          </motion.div>
        </div>
      )}
    </>
  )
}
