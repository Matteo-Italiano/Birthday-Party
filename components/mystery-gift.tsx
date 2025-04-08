"use client"

import { useState } from "react"
import { Gift, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

export function MysteryGift() {
  const [isOpened, setIsOpened] = useState(false)
  const [isWiggling, setIsWiggling] = useState(false)

  const handleGiftClick = () => {
    if (isOpened) return

    // Play pop sound
    const popSound = new Audio("/pop-sound.mp3")
    popSound.volume = 0.5
    popSound.play().catch(() => {
      // Handle autoplay restrictions
      console.log("Audio playback prevented due to browser restrictions")
    })

    // Trigger wiggle animation
    setIsWiggling(true)
    setTimeout(() => setIsWiggling(false), 500)

    // Open the gift after wiggle
    setTimeout(() => {
      setIsOpened(true)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 600)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-xl font-bold text-pink-600 mb-4">Mystery Gift Box</h3>

      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isWiggling ? "animate-wiggle" : ""
        } ${isOpened ? "scale-110" : "hover:scale-105"}`}
        onClick={handleGiftClick}
      >
        {!isOpened ? (
          <div className="relative">
            <div className="bg-pink-500 w-32 h-32 rounded-lg shadow-lg flex items-center justify-center">
              <Gift size={64} className="text-white" />
              <Sparkles size={20} className="text-yellow-300 absolute top-0 right-0 animate-pulse" />
              <Sparkles size={20} className="text-yellow-300 absolute bottom-0 left-0 animate-pulse delay-300" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-bold text-lg">Tap me!</p>
            </div>
          </div>
        ) : (
          <div className="bg-purple-100 w-40 h-40 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center">
            <p className="text-lg font-bold text-purple-800">Nice try 😏</p>
            <p className="text-purple-700">...patience, Eli!</p>
            <div className="text-3xl mt-2 animate-bounce">🎁</div>
          </div>
        )}
      </div>
    </div>
  )
}
