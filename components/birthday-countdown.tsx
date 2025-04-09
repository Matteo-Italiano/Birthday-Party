"use client"

import { useState, useEffect } from "react"

export function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the birthday end date (April 10, 2025 at midnight)
    const birthdayEnd = new Date("April 11, 2025 23:59:59").getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = birthdayEnd - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        // Birthday is over
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clean up
    return () => clearInterval(timer)
  }, [])

  // Format the time with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  // If birthday is over
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-lg shadow-lg text-center">
        <p className="text-lg font-bold">Eli's birthday has ended! 🎂</p>
        <p>But the memories will last forever! 💖</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-2 sm:mb-0">
          <p className="text-lg font-bold">Still time to party! 🎉</p>
        </div>
        <div className="flex items-center space-x-1">
          <p className="font-medium">Time left:</p>
          <div className="font-mono font-bold text-lg">
            {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </div>
        </div>
      </div>
    </div>
  )
}
