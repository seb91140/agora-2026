'use client'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ThumbsUp, ThumbsDown, Users } from 'lucide-react'

interface ResultBarsProps {
  pourPercent: number
  totalVotes: number
  userVote?: 'pour' | 'contre'
}

export function ResultBars({ pourPercent, totalVotes, userVote }: ResultBarsProps) {
  const contrePercent = 100 - pourPercent

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Users size={15} />
        <span>{totalVotes.toLocaleString('fr-FR')} votes exprimés</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <ThumbsUp size={16} className="text-emerald-600" />
            <span className="font-semibold text-emerald-700">POUR</span>
            {userVote === 'pour' && (
              <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                Votre vote
              </span>
            )}
          </div>
          <ProgressBar value={pourPercent} color="bg-emerald-500" height="lg" />
          <p className="text-2xl font-black text-emerald-700">{pourPercent}%</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <ThumbsDown size={16} className="text-rouge-marianne" />
            <span className="font-semibold text-rouge-marianne">CONTRE</span>
            {userVote === 'contre' && (
              <span className="text-xs bg-red-100 text-rouge-marianne font-semibold px-2 py-0.5 rounded-full">
                Votre vote
              </span>
            )}
          </div>
          <ProgressBar value={contrePercent} color="bg-rouge-marianne" height="lg" />
          <p className="text-2xl font-black text-rouge-marianne">{contrePercent}%</p>
        </div>
      </div>
    </div>
  )
}
