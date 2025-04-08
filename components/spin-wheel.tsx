"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"

const rewards = [
  "1 Free Hug from Me",
  "A Legendary High Five ✋",
  "You win... absolutely nothing 😎",
  "Get Cake Now 🍰",
  "Secret unlocked: You're awesome",
]

const colors = ["#f472b6", "#c084fc", "#818cf8", "#fb7185", "#a78bfa"]

export function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    // Reset previous result
    setResult(null)
    setShowPopup(false)

    // Set spinning state
    setIsSpinning(true)

    // Calculate a random number of full rotations (5-10) plus a random segment
    const spinDegrees = 360 * (Math.floor(Math.random() * 5) + 5) + Math.floor(Math.random() * 360)

    // Animate the wheel
    setRotation(spinDegrees)

    // Calculate which reward was landed on
    setTimeout(() => {
      const normalizedRotation = spinDegrees % 360
      const segmentSize = 360 / rewards.length
      // We need to adjust the index calculation because the wheel spins clockwise
      // and our segments are positioned counter-clockwise
      const rewardIndex = rewards.length - 1 - Math.floor(normalizedRotation / segmentSize)
      const selectedReward = rewards[rewardIndex % rewards.length]

      setResult(selectedReward)
      setIsSpinning(false)
      setShowPopup(true)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 5000) // Match this with the CSS transition duration
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <h3 className="text-xl font-bold text-pink-600 mb-4">Birthday Spin Wheel</h3>

      <div className="relative w-64 h-64 mb-4">
        {/* Static wheel background */}
        <div className="absolute w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden">
          {rewards.map((_, index) => {
            const segmentSize = 360 / rewards.length
            const startAngle = index * segmentSize

            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${startAngle}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentSize * Math.PI) / 180)}% ${
                    50 + 50 * Math.sin((segmentSize * Math.PI) / 180)
                  }%, 50% 50%)`,
                  backgroundColor: colors[index % colors.length],
                }}
              />
            )
          })}
        </div>

        {/* Spinning wheel with text */}
        <motion.div
          className="absolute w-full h-full rounded-full"
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeOut" }}
          style={{ transformOrigin: "center center" }}
        >
          {rewards.map((reward, index) => {
            const segmentSize = 360 / rewards.length
            const angle = index * segmentSize + segmentSize / 2

            return (
              <div
                key={index}
                className="absolute top-0 left-0 w-full h-full flex justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="absolute top-8 transform -translate-x-1/2 bg-white/80 px-1 py-0.5 rounded text-center max-w-20 text-xs font-bold shadow-sm"
                  style={{
                    transform: `rotate(${-angle}deg)`,
                  }}
                >
                  {reward}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Center pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md z-10 border-2 border-pink-500"></div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 z-20">
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all text-lg ${
          isSpinning ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 active:scale-95 animate-pulse"
        }`}
      >
        {isSpinning ? "Spinning..." : "SPIN!"}
      </button>

      {/* Result popup */}
      {showPopup && result && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closePopup}>
          <motion.div
            className="bg-white rounded-xl p-6 max-w-xs w-full text-center shadow-2xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">🎉</div>
            <h4 className="text-xl font-bold text-pink-600 mb-2">You won:</h4>
            <p className="text-2xl font-bold text-purple-700 mb-4">{result}</p>
            <button
              onClick={closePopup}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              Awesome!
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
