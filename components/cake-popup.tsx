"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function CakePopup() {
  const [showCake, setShowCake] = useState(false)
  const [madeWish, setMadeWish] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [hasShownBefore, setHasShownBefore] = useState(false)

  useEffect(() => {
    // Check if we've shown the cake before in this session
    const cakeShownBefore = sessionStorage.getItem("cakeShown") === "true"
    setHasShownBefore(cakeShownBefore)

    const handleScroll = () => {
      // Only show cake after scrolling if it hasn't been shown before
      if (window.scrollY > 500 && !showCake && !cakeShownBefore) {
        setShowCake(true)
        // Mark as shown for this session
        sessionStorage.setItem("cakeShown", "true")
        setHasShownBefore(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showCake])

  const handleMakeWish = () => {
    setShowSparkles(true)

    // After sparkle animation, show the message
    setTimeout(() => {
      setMadeWish(true)
      setShowSparkles(false)
    }, 2000)
  }

  const handleClose = () => {
    setShowCake(false)
    // Reset after a while so it can appear again if needed
    setTimeout(() => {
      setMadeWish(false)
    }, 500)
  }

  if (!showCake) return null

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 p-4">
      <motion.div
        className="bg-white rounded-xl p-6 max-w-xs w-full text-center shadow-2xl relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Close button */}
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        {!madeWish ? (
          <>
            <div className="relative mb-4">
              {/* Cake */}
              <div className="text-6xl mb-2">🎂</div>

              {/* Candles */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 flex space-x-1">
                <div className="w-1 h-6 bg-pink-500 rounded-full relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-1 h-8 bg-purple-500 rounded-full relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-1 h-7 bg-pink-500 rounded-full relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Sparkles animation overlay */}
              {showSparkles && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-yellow-400 text-lg"
                        initial={{
                          x: "50%",
                          y: "40%",
                          scale: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          scale: Math.random() * 2 + 0.5,
                          opacity: 0,
                        }}
                        transition={{ duration: 2 }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-pink-600 mb-3">Make a wish!</h3>

            <button
              onClick={handleMakeWish}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-colors"
            >
              Blow out candles
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">🎇</div>
            <h3 className="text-xl font-bold text-pink-600 mb-2">Wish registered!</h3>
            <p className="text-gray-700">Universe notified. 🌠</p>
          </>
        )}
      </motion.div>
    </div>
  )
}
