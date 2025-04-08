import type { ReactNode } from "react"

interface MessageCardProps {
  children: ReactNode
}

export function MessageCard({ children }: MessageCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
      <p className="text-xl font-medium text-center text-gray-800">{children}</p>
    </div>
  )
}
