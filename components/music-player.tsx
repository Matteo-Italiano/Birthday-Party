"use client"

import { useState, useRef } from "react"
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        console.log("Audio playback prevented due to browser restrictions")
      })
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isExpanded ? "bg-white rounded-lg shadow-lg p-4 w-64" : "bg-pink-500 rounded-full shadow-lg p-3"
      }`}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/birthday-music.mp3" loop />

      {isExpanded ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3">
            <h4 className="font-bold text-pink-600">🎵 Eli's Anthem</h4>
            <button onClick={toggleExpand} className="text-gray-500 hover:text-gray-700">
              <Music size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4 w-full">
            <button
              onClick={togglePlay}
              className="bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <div className="text-sm font-medium text-gray-700">{isPlaying ? "Now Playing" : "Click to Play"}</div>

            <button onClick={toggleMute} className="text-gray-500 hover:text-gray-700">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={toggleExpand} className="text-white flex items-center justify-center w-10 h-10">
          <Music size={24} />
        </button>
      )}
    </div>
  )
}
