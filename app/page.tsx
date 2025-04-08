import { Confetti } from "@/components/confetti"
import { BirthdayCarousel } from "@/components/birthday-carousel"
import { MessageCard } from "@/components/message-card"
import { MysteryGift } from "@/components/mystery-gift"
import { SpinWheel } from "@/components/spin-wheel"
import { MusicPlayer } from "@/components/music-player"
import { EliTrivia } from "@/components/eli-trivia"
import { BirthdayScroll } from "@/components/birthday-scroll"
import { BirthdayCountdown } from "@/components/birthday-countdown"
import { HiddenSurprise } from "@/components/hidden-surprise"
import { CakePopup } from "@/components/cake-popup"
import { ValorantFrame } from "@/components/valorant-frame"
import { AiFail } from "@/components/ai-fail"
import { SwingingBroom } from "@/components/swinging-broom"
import { MathGallery } from "@/components/math-gallery"

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 px-4 py-8 relative overflow-hidden">
      <Confetti />
      <MusicPlayer />
      <HiddenSurprise />
      <CakePopup />

      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">Happy Birthday Eli! 🎂</h1>
          <div className="flex justify-center space-x-2 text-2xl">
            <span>🎉</span>
            <span>🎁</span>
            <span>🎈</span>
            <span>🥳</span>
            <span>🎊</span>
          </div>
        </header>

        {/* Birthday Countdown */}
        <BirthdayCountdown />

        {/* Messages */}
        <div className="space-y-4">
          <MessageCard>You&apos;re older, but still not wiser 😉</MessageCard>
          <MessageCard>Swipe for surprises!</MessageCard>
          <MessageCard>Today is about you – enjoy it like a king 👑</MessageCard>
        </div>

        {/* Mystery Gift */}
        <MysteryGift />

        {/* Carousel */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center mb-4 text-purple-600">Your Birthday Treats</h2>
          <BirthdayCarousel />
        </div>

        {/* Valorant Frame */}
        <ValorantFrame />

        {/* Spin Wheel */}
        <SpinWheel />

        {/* AI Fail */}
        <AiFail />

        {/* Swinging Broom */}
        <SwingingBroom />

        {/* Math Gallery */}
        <MathGallery />

        {/* Eli Trivia */}
        <div className="mt-8">
          <EliTrivia />
        </div>

        {/* Birthday Scroll */}
        <div className="mt-8">
          <BirthdayScroll />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center bg-white rounded-xl p-6 shadow-lg">
          <p className="text-lg font-medium text-gray-700">
            Your real gift is on the way... but for now, enjoy this digital party 🎉💻
          </p>
        </footer>
      </div>
    </main>
  )
}
