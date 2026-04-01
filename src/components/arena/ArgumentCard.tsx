'use client'
import { ChevronUp, User } from 'lucide-react'
import { formatShortDate } from '@/lib/date-utils'
import type { Argument } from '@/types'

interface ArgumentCardProps {
  argument: Argument
  rank: number
  isUpvoted: boolean
  onUpvote: (id: string) => void
  isOwn?: boolean
}

export function ArgumentCard({ argument, rank, isUpvoted, onUpvote, isOwn }: ArgumentCardProps) {
  const medalColors = ['text-yellow-500', 'text-gray-400', 'text-amber-700']
  const medalBg = ['bg-yellow-50 border-yellow-200', 'bg-gray-50 border-gray-200', 'bg-amber-50 border-amber-200']

  return (
    <div className={`rounded-xl border-2 p-5 transition-all ${rank <= 3 ? medalBg[rank - 1] : 'bg-white border-gray-100'}`}>
      <div className="flex gap-4">
        {/* Rank + upvote */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <span className={`text-xl font-black ${rank <= 3 ? medalColors[rank - 1] : 'text-gray-300'}`}>
            #{rank}
          </span>
          <button
            onClick={() => onUpvote(argument.id)}
            className={[
              'flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg transition-all',
              isUpvoted
                ? 'bg-bleu-republic text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-bleu-republic hover:text-bleu-republic',
            ].join(' ')}
          >
            <ChevronUp size={16} />
            <span className="text-xs font-bold">{argument.upvotes + (isUpvoted && !argument.isMock ? 0 : 0)}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 text-sm leading-relaxed">{argument.body}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <User size={12} />
              <span className="font-medium">{argument.authorPseudonym}</span>
              {isOwn && <span className="bg-bleu-republic text-white text-xs px-1.5 py-0.5 rounded-full">Vous</span>}
            </div>
            <span className="text-xs text-gray-400">{formatShortDate(argument.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
