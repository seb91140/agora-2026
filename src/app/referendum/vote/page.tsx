'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useVote } from '@/hooks/useVote'
import { useQuiz } from '@/hooks/useQuiz'
import { VoteButtons } from '@/components/referendum/VoteButtons'
import { ResultBars } from '@/components/referendum/ResultBars'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { currentReferendum } from '@/data/current-referendum'
import { POINTS } from '@/lib/scoring'
import { MessageSquare, BookOpen, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function VotePage() {
  const { user, isAuthenticated, loading, addPoints, updateUser } = useAuth()
  const { hasVoted, voteRecord, castVote } = useVote(currentReferendum.weekId)
  const { hasPassedQuiz } = useQuiz(currentReferendum.weekId)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/auth')
    if (!loading && isAuthenticated && !hasPassedQuiz) router.push('/referendum/quiz')
  }, [loading, isAuthenticated, hasPassedQuiz, router])

  const handleVote = (side: 'pour' | 'contre') => {
    castVote(currentReferendum.id, side)
    addPoints(POINTS.VOTE_CAST)
    if (user) {
      updateUser({ votedWeeks: [...(user.votedWeeks ?? []), currentReferendum.weekId] })
    }
    toast(`Vote enregistré ! +${POINTS.VOTE_CAST} points`)
  }

  // Simulated live totals including user vote
  const totalVotes = currentReferendum.totalVotes + (hasVoted ? 1 : 0)
  const pourVotes = Math.round(currentReferendum.pourPercent / 100 * currentReferendum.totalVotes) + (hasVoted && voteRecord?.side === 'pour' ? 1 : 0)
  const pourPercent = Math.round(pourVotes / totalVotes * 100)

  if (loading) return null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold text-bleu-republic uppercase tracking-wider mb-2">
          Votre vote
        </p>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">
          {currentReferendum.title}
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
        {!hasVoted ? (
          <>
            <p className="text-gray-600 text-sm text-center">
              Votre vote est anonyme et définitif. Prenez le temps de la réflexion.
            </p>
            <VoteButtons onVote={handleVote} />
          </>
        ) : (
          <>
            {/* Result */}
            <div className="text-center space-y-2">
              <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-lg font-black ${
                voteRecord?.side === 'pour'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-50 text-rouge-marianne'
              }`}>
                {voteRecord?.side === 'pour' ? <ThumbsUp size={20} /> : <ThumbsDown size={20} />}
                Vous avez voté {voteRecord?.side?.toUpperCase()}
              </div>
              <p className="text-gray-500 text-sm">Merci pour votre participation citoyenne !</p>
            </div>

            {/* Live results */}
            <ResultBars
              pourPercent={pourPercent}
              totalVotes={totalVotes}
              userVote={voteRecord?.side}
            />

            {/* Next steps */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/referendum/arena"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors text-center"
              >
                <MessageSquare size={22} className="text-purple-600" />
                <div>
                  <p className="font-bold text-sm text-gray-900">L'Arène</p>
                  <p className="text-xs text-gray-500">Débattre & voter les arguments</p>
                </div>
              </Link>
              <Link
                href="/referendum/eclairage"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-center"
              >
                <BookOpen size={22} className="text-amber-600" />
                <div>
                  <p className="font-bold text-sm text-gray-900">Éclairage</p>
                  <p className="text-xs text-gray-500">Histoire & Science</p>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
