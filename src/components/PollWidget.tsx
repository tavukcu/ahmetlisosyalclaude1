'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

interface PollOption {
  text: string
  votes: number
  id?: string
}

interface PollWidgetProps {
  pollId?: string
  question?: string
  options?: PollOption[]
  totalVotes?: number
}

export default function PollWidget({
  pollId = 'demo',
  question = 'Ahmetli\'nin en önemli sorunu nedir?',
  options: initialOptions,
  totalVotes: initialTotal,
}: PollWidgetProps) {
  const defaultOptions: PollOption[] = initialOptions || [
    { text: 'Ulaşım', votes: 45 },
    { text: 'İstihdam', votes: 82 },
    { text: 'Altyapı', votes: 37 },
    { text: 'Eğitim', votes: 29 },
  ]

  const [options, setOptions] = useState(defaultOptions)
  const [hasVoted, setHasVoted] = useState(false)
  const [totalVotes, setTotalVotes] = useState(initialTotal || defaultOptions.reduce((sum, o) => sum + o.votes, 0))

  useEffect(() => {
    const voted = localStorage.getItem(`poll_${pollId}`)
    if (voted) setHasVoted(true)
  }, [pollId])

  const handleVote = async (index: number) => {
    if (hasVoted) return

    const newOptions = [...options]
    newOptions[index].votes += 1
    setOptions(newOptions)
    setTotalVotes(prev => prev + 1)
    setHasVoted(true)
    localStorage.setItem(`poll_${pollId}`, String(index))

    // Send vote to API
    if (pollId !== 'demo') {
      try {
        await fetch(`/api/polls/${pollId}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ optionIndex: index }),
        })
      } catch {
        // Vote saved locally even if API fails
      }
    }
  }

  return (
    <div className="sidebar-widget">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Anket</h3>
        <Link href="/anketler" className="text-primary-600 text-xs hover:underline flex items-center gap-1">
          Tümü <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <p className="text-sm font-medium text-gray-700 mb-3">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

          return (
            <div key={index}>
              {hasVoted ? (
                <div className="relative">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{option.text}</span>
                    <span className="font-semibold text-gray-800">%{percentage}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleVote(index)}
                  className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
                >
                  {option.text}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Toplam {totalVotes} oy
      </p>
    </div>
  )
}
