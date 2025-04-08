"use client"

import { useState } from "react"
import confetti from "canvas-confetti"

const triviaQuestions = [
  {
    question: "What's Eli's favorite thing in the world?",
    options: ["Pizza", "Sleep", "Memes", "Complaining about homework/Barilan"],
    correctAnswer: null, // All answers are correct!
  },
  {
    question: "How many times has Eli been late this year?",
    options: [
      "Never, he's perfect",
      "Only once... per day",
      "Enough to set a world record",
      "Time is a social construct",
    ],
    correctAnswer: null,
  },
  {
    question: "What would Eli take to a desert island?",
    options: ["A WiFi router (no internet)", "A mirror", "A lifetime supply of snacks", "You, obviously"],
    correctAnswer: null,
  },
  {
    question: "How does Eli dance at parties?",
    options: [
      "Like nobody's watching",
      "Like EVERYBODY is watching",
      "What dancing? He's the DJ",
      "Bold of you to assume he dances",
    ],
    correctAnswer: null,
  },
]

export function EliTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    // Show result first
    setShowResult(true)

    // Trigger confetti
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
    })

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < triviaQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizComplete(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizComplete(false)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-center text-pink-600 mb-4">Eli Trivia Quiz</h3>

      {!quizComplete ? (
        <div>
          <div className="mb-4 text-center">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {triviaQuestions.length}
            </span>
            <h4 className="text-lg font-bold text-gray-800 mt-1">{triviaQuestions[currentQuestion].question}</h4>
          </div>

          <div className="space-y-3 mb-6">
            {triviaQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedAnswer === index ? "bg-pink-100 border-2 border-pink-500" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="bg-purple-100 p-4 rounded-lg text-center animate-fadeIn mb-4">
              <p className="font-bold text-purple-800">You clearly know Eli too well 😄</p>
              <p className="text-purple-700 text-sm">That was the perfect answer!</p>
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              selectedAnswer === null
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 active:scale-98"
            }`}
          >
            {currentQuestion < triviaQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="text-4xl mb-3">🎉</div>
          <h4 className="text-xl font-bold text-pink-600 mb-2">Quiz Complete!</h4>
          <p className="text-gray-700 mb-4">
            Congratulations! You've proven yourself to be an Eli expert of the highest order!
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
