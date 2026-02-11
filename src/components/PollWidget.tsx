'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

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
  const [votedIndex, setVotedIndex] = useState<number | null>(null)
  const [totalVotes, setTotalVotes] = useState(initialTotal || defaultOptions.reduce((sum, o) => sum + o.votes, 0))

  useEffect(() => {
    const voted = localStorage.getItem(`poll_${pollId}`)
    if (voted) {
      setHasVoted(true)
      setVotedIndex(Number(voted))
    }
  }, [pollId])

  const handleVote = async (index: number) => {
    if (hasVoted) return

    const newOptions = [...options]
    newOptions[index].votes += 1
    setOptions(newOptions)
    setTotalVotes(prev => prev + 1)
    setHasVoted(true)
    setVotedIndex(index)
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

  const maxVotes = Math.max(...options.map(o => o.votes))

  return (
    <div className="sidebar-widget">
      <div className="flex items-center justify-between mb-4">
        <h3 className="widget-header !mb-0 !pb-0 after:hidden">Anket</h3>
        <Link href="/anketler" className="text-primary-600 text-xs font-semibold hover:text-primary-700 flex items-center gap-1 transition-colors">
          Tümü <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <p className="text-sm font-bold text-gray-700 mb-4 leading-snug">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
          const isMax = option.votes === maxVotes
          const isVoted = votedIndex === index

          return (
            <div key={index}>
              {hasVoted ? (
                <div className={`relative p-3 rounded-xl border transition-all ${isVoted ? 'border-primary-200 bg-primary-50/50' : 'border-gray-100 bg-gray-50/50'}`}>
                  <div className="flex items-center justify-between text-sm mb-1.5 relative z-10">
                    <span className={`font-medium flex items-center gap-1.5 ${isVoted ? 'text-primary-700' : 'text-gray-700'}`}>
                      {isVoted && <FiCheckCircle className="w-3.5 h-3.5 text-primary-600" />}
                      {option.text}
                    </span>
                    <span className={`font-extrabold ${isMax ? 'text-primary-700' : 'text-gray-500'}`}>%{percentage}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${isMax ? 'bg-gradient-to-r from-primary-500 to-primary-400' : 'bg-gray-300'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleVote(index)}
                  className="w-full text-left px-4 py-3 text-sm font-medium border border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 active:scale-[0.98]"
                >
                  {option.text}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center font-medium">
        Toplam {totalVotes.toLocaleString('tr-TR')} oy
      </p>
    </div>
  )
}
