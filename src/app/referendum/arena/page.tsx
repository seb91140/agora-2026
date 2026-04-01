'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useArguments } from '@/hooks/useArguments'
import { useVote } from '@/hooks/useVote'
import { ArgumentCard } from '@/components/arena/ArgumentCard'
import { SubmitArgumentForm } from '@/components/arena/SubmitArgumentForm'
import { useToast } from '@/components/ui/Toast'
import { currentReferendum } from '@/data/current-referendum'
import { POINTS } from '@/lib/scoring'
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react'
import type { ArgumentSide } from '@/types'

export default function ArenaPage() {
  const { user, isAuthenticated, loading, addPoints } = useAuth()
  const { voteRecord } = useVote(currentReferendum.weekId)
  const {
    pourArgs, contreArgs, submitArgument, upvoteArgument,
    upvoted, fairPlayRecorded, recordFairPlay,
  } = useArguments(currentReferendum.weekId, currentReferendum.id)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/auth')
  }, [loading, isAuthenticated, router])

  const handleSubmit = (body: string, side: ArgumentSide) => {
    if (!user) return
    submitArgument(body, side, user.pseudonym)
    addPoints(POINTS.ARGUMENT_SUBMITTED)
    toast(`Argument soumis ! +${POINTS.ARGUMENT_SUBMITTED} points`)
  }

  const handleUpvote = (argId: string) => {
    if (!user) return
    upvoteArgument(argId)
    // Fair-play: award points for reading and upvoting an opposing argument
    const allArgs = [...pourArgs, ...contreArgs]
    const arg = allArgs.find(a => a.id === argId)
    if (arg && voteRecord && arg.side !== voteRecord.side) {
      const newFairPlay = recordFairPlay()
      if (newFairPlay) {
        addPoints(POINTS.READ_OPPOSING)
        toast(`Score Fair-Play ! +${POINTS.READ_OPPOSING} pts pour avoir soutenu un argument opposé au vôtre.`)
      }
    }
    toast('Vote comptabilisé !')
  }

  if (loading) return null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-bleu-republic uppercase tracking-wider mb-2">
          L'Arène des Arguments
        </p>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          {currentReferendum.title}
        </h1>
        <p className="text-gray-500 text-sm">
          Les arguments sont classés par votes de la communauté. Soumettez le vôtre, votez pour les meilleurs.
          Upvotez un argument <strong>opposé au vôtre</strong> pour gagner le bonus Fair-Play.
        </p>
      </div>

      {/* Fair-play notice */}
      {!fairPlayRecorded && voteRecord && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
          <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Bonus Fair-Play disponible !</strong> Vous avez voté <strong>{voteRecord.side.toUpperCase()}</strong>.
            Upvotez un argument {voteRecord.side === 'pour' ? 'CONTRE' : 'POUR'} pour gagner <strong>+{POINTS.READ_OPPOSING} points</strong>.
          </p>
        </div>
      )}

      {/* Arguments grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* POUR */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp size={18} className="text-emerald-600" />
            <h2 className="text-lg font-black text-emerald-700">Top 3 POUR</h2>
          </div>
          <div className="space-y-4">
            {pourArgs.map((arg, i) => (
              <ArgumentCard
                key={arg.id}
                argument={arg}
                rank={i + 1}
                isUpvoted={!!upvoted[arg.id]}
                onUpvote={handleUpvote}
                isOwn={arg.authorPseudonym === user?.pseudonym}
              />
            ))}
          </div>
        </div>

        {/* CONTRE */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown size={18} className="text-rouge-marianne" />
            <h2 className="text-lg font-black text-rouge-marianne">Top 3 CONTRE</h2>
          </div>
          <div className="space-y-4">
            {contreArgs.map((arg, i) => (
              <ArgumentCard
                key={arg.id}
                argument={arg}
                rank={i + 1}
                isUpvoted={!!upvoted[arg.id]}
                onUpvote={handleUpvote}
                isOwn={arg.authorPseudonym === user?.pseudonym}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Submit form */}
      {isAuthenticated && (
        <SubmitArgumentForm onSubmit={handleSubmit} />
      )}
    </div>
  )
}
