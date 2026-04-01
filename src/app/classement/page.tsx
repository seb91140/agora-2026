'use client'
import { useAuth } from '@/hooks/useAuth'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import { LeaderboardRow } from '@/components/classement/LeaderboardRow'
import { getTier, getTierColor, getNextTierInfo } from '@/lib/scoring'
import { Trophy, Info } from 'lucide-react'
import Link from 'next/link'

export default function ClassementPage() {
  const { user, isAuthenticated } = useAuth()
  const leaderboard = useLeaderboard(user)

  const nextTier = user ? getNextTierInfo(user.score) : null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={20} className="text-or-civic" />
          <p className="text-xs font-semibold text-or-civic uppercase tracking-wider">Classement National</p>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Les Citoyens les plus éclairés</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Chaque vote, quiz, et argument vous rapporte des points. Grimpez dans les rangs.
        </p>
      </div>

      {/* Current user card */}
      {isAuthenticated && user ? (
        <div className="bg-gradient-to-br from-bleu-republic to-[#001a6e] rounded-2xl p-6 mb-8 text-white">
          <p className="text-white/70 text-xs uppercase tracking-wider mb-3">Votre position</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-black">
              {user.pseudonym[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-black text-xl">{user.pseudonym}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getTierColor(getTier(user.score))}`}>
                  {getTier(user.score)}
                </span>
                <span className="text-white/70 text-sm">{user.score} points</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-or-civic">
                #{leaderboard.find(e => e.isCurrentUser)?.rank ?? '—'}
              </p>
              <p className="text-white/60 text-xs">classement</p>
            </div>
          </div>
          {nextTier && (
            <div className="mt-4 bg-white/10 rounded-xl px-4 py-3">
              <div className="flex justify-between text-xs text-white/80 mb-1.5">
                <span>Prochain rang : <strong>{nextTier.next}</strong></span>
                <span>{nextTier.pointsNeeded} pts manquants</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-or-civic rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, 100 - (nextTier.pointsNeeded / (nextTier.pointsNeeded + user.score)) * 100)}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <Info size={18} className="text-gray-400 shrink-0" />
          <p className="text-gray-600 text-sm">
            <Link href="/auth" className="font-semibold text-bleu-republic hover:underline">Créez votre compte</Link>
            {' '}pour apparaître dans le classement et accumuler des points.
          </p>
        </div>
      )}

      {/* Tier legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { tier: 'Citoyen', pts: '0-74', color: 'bg-gray-100 text-gray-700 border-gray-300' },
          { tier: 'Délégué', pts: '75-199', color: 'bg-blue-100 text-blue-800 border-blue-300' },
          { tier: 'Sénateur', pts: '200-499', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
          { tier: 'Ambassadeur', pts: '500+', color: 'bg-purple-100 text-purple-800 border-purple-300' },
        ].map(t => (
          <div key={t.tier} className={`text-center px-3 py-2 rounded-lg border text-xs font-semibold ${t.color}`}>
            <p>{t.tier}</p>
            <p className="font-normal opacity-70">{t.pts} pts</p>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        {leaderboard.slice(0, 20).map(entry => (
          <LeaderboardRow key={entry.pseudonym} entry={entry} />
        ))}
      </div>
    </div>
  )
}
