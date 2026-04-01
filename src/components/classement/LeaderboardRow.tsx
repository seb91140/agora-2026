import { getTierColor } from '@/lib/scoring'
import { Crown, Medal } from 'lucide-react'
import type { LeaderboardEntry } from '@/types'

interface LeaderboardRowProps {
  entry: LeaderboardEntry
}

const rankIcons: Record<number, React.ReactNode> = {
  1: <Crown size={18} className="text-yellow-500" />,
  2: <Medal size={18} className="text-gray-400" />,
  3: <Medal size={18} className="text-amber-700" />,
}

export function LeaderboardRow({ entry }: LeaderboardRowProps) {
  return (
    <div className={[
      'flex items-center gap-4 px-5 py-4 rounded-xl transition-colors',
      entry.isCurrentUser ? 'bg-blue-50 border-2 border-bleu-republic' : 'bg-white border border-gray-100 hover:border-gray-200',
    ].join(' ')}>
      {/* Rank */}
      <div className="w-8 flex items-center justify-center shrink-0">
        {rankIcons[entry.rank] ?? (
          <span className="text-sm font-bold text-gray-400">{entry.rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className={[
        'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
        entry.isCurrentUser ? 'bg-bleu-republic text-white' : 'bg-gray-100 text-gray-600',
      ].join(' ')}>
        {entry.pseudonym[0].toUpperCase()}
      </div>

      {/* Name + tier */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-sm truncate ${entry.isCurrentUser ? 'text-bleu-republic' : 'text-gray-900'}`}>
            {entry.pseudonym}
          </span>
          {entry.isCurrentUser && <span className="text-xs text-bleu-republic font-medium shrink-0">(vous)</span>}
        </div>
        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mt-0.5 ${getTierColor(entry.tier)}`}>
          {entry.tier}
        </span>
      </div>

      {/* Badges */}
      {entry.badges > 0 && (
        <div className="text-xs text-gray-400 shrink-0">
          {'🏅'.repeat(Math.min(entry.badges, 3))}
        </div>
      )}

      {/* Score */}
      <div className="text-right shrink-0">
        <p className="font-black text-lg text-or-civic">{entry.score}</p>
        <p className="text-xs text-gray-400">points</p>
      </div>
    </div>
  )
}
