'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getTier, getTierColor, getNextTierInfo, POINTS } from '@/lib/scoring'
import { formatShortDate } from '@/lib/date-utils'
import { User, Trophy, Vote, Brain, MessageSquare, Star } from 'lucide-react'
import Link from 'next/link'

export default function ProfilPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/auth')
  }, [loading, isAuthenticated, router])

  if (loading || !user) return null

  const tier = getTier(user.score)
  const nextTier = getNextTierInfo(user.score)

  const stats = [
    { label: 'Votes exprimés', value: user.votedWeeks.length, icon: <Vote size={16} className="text-bleu-republic" /> },
    { label: 'Quiz réussis', value: user.quizPassedWeeks.length, icon: <Brain size={16} className="text-purple-500" /> },
    { label: 'Semaines Fair-Play', value: user.fairPlayWeeks.length, icon: <Star size={16} className="text-or-civic" /> },
    { label: 'Badges', value: user.badges.length, icon: <Trophy size={16} className="text-amber-500" /> },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header card */}
      <div className="bg-gradient-to-br from-bleu-republic to-[#001a6e] rounded-3xl p-8 text-white mb-8">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black shrink-0">
            {user.pseudonym[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black">{user.pseudonym}</h1>
            <p className="text-white/60 text-sm">Membre depuis {formatShortDate(user.createdAt)}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getTierColor(tier)}`}>
                {tier}
              </span>
              <span className="text-or-civic font-black text-lg">{user.score} pts</span>
            </div>
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && (
          <div className="mt-6 bg-white/10 rounded-xl px-4 py-3">
            <div className="flex justify-between text-xs text-white/80 mb-1.5">
              <span>Prochain rang : <strong>{nextTier.next}</strong></span>
              <span>{nextTier.pointsNeeded} pts restants</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-or-civic rounded-full"
                style={{
                  width: `${Math.min(100, 100 - (nextTier.pointsNeeded / (nextTier.pointsNeeded + user.score)) * 100)}%`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Scoring guide */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Comment gagner des points ?</h2>
        <div className="space-y-3">
          {[
            { label: 'Réussir le quiz', pts: POINTS.QUIZ_PASSED, icon: <Brain size={14} className="text-purple-500" /> },
            { label: 'Voter', pts: POINTS.VOTE_CAST, icon: <Vote size={14} className="text-bleu-republic" /> },
            { label: 'Soumettre un argument', pts: POINTS.ARGUMENT_SUBMITTED, icon: <MessageSquare size={14} className="text-gray-500" /> },
            { label: 'Soutenir un argument opposé (Fair-Play)', pts: POINTS.READ_OPPOSING, icon: <Star size={14} className="text-or-civic" /> },
            { label: 'Argument reçoit 3 upvotes', pts: POINTS.ARGUMENT_UPVOTED, icon: <Trophy size={14} className="text-amber-500" /> },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                {item.icon}
                {item.label}
              </div>
              <span className="text-sm font-black text-or-civic">+{item.pts} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/referendum"
          className="flex-1 text-center py-3 bg-bleu-republic text-white rounded-xl font-semibold text-sm hover:bg-bleu-republic-600 transition-colors"
        >
          Voter cette semaine
        </Link>
        <button
          onClick={() => { logout(); router.push('/') }}
          className="px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </div>
  )
}
