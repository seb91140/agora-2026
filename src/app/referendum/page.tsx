'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useVote } from '@/hooks/useVote'
import { useQuiz } from '@/hooks/useQuiz'
import { currentReferendum } from '@/data/current-referendum'
import { getTimeRemaining, formatShortDate } from '@/lib/date-utils'
import { Brain, Vote, MessageSquare, BookOpen, CheckCircle, Lock, Clock, ExternalLink } from 'lucide-react'

export default function ReferendumPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const { hasVoted, voteRecord } = useVote(currentReferendum.weekId)
  const { isQuizDone, hasPassedQuiz } = useQuiz(currentReferendum.weekId)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [loading, isAuthenticated, router])

  if (loading) return null

  const steps = [
    {
      href: '/referendum/quiz',
      icon: <Brain size={22} />,
      label: 'Quiz de Validation',
      desc: '3 questions pour vérifier que vous comprenez les enjeux du texte.',
      points: '+15 pts',
      done: isQuizDone,
      locked: false,
    },
    {
      href: '/referendum/vote',
      icon: <Vote size={22} />,
      label: 'Voter Pour ou Contre',
      desc: 'Exprimez votre position après avoir compris les enjeux.',
      points: '+10 pts',
      done: hasVoted,
      locked: !hasPassedQuiz,
    },
    {
      href: '/referendum/arena',
      icon: <MessageSquare size={22} />,
      label: "L'Arène des Arguments",
      desc: 'Lisez les meilleurs arguments, soumettez le vôtre, upvotez.',
      points: '+5 à +10 pts',
      done: false,
      locked: false,
    },
    {
      href: '/referendum/eclairage',
      icon: <BookOpen size={22} />,
      label: 'Éclairage Scientifique & Historique',
      desc: "L'IA agrège ce que dit la recherche et ce que dit l'histoire.",
      points: '+5 pts',
      done: false,
      locked: false,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-bleu-republic text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Référendum de la semaine
          </span>
          <span className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Clock size={13} />
            {getTimeRemaining(currentReferendum.expiresAt)}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
          {currentReferendum.title}
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">{currentReferendum.summary}</p>
        <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm">
          <p className="text-gray-700 leading-relaxed line-clamp-3">{currentReferendum.fullText.split('\n')[0]}</p>
          <a
            href={currentReferendum.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-bleu-republic font-medium mt-2 hover:underline"
          >
            {currentReferendum.source}
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* User greeting */}
      {user && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
          <div className="w-9 h-9 bg-bleu-republic rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user.pseudonym[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-bleu-republic text-sm">Bonjour, {user.pseudonym} !</p>
            <p className="text-xs text-gray-500">
              {isQuizDone && hasPassedQuiz && !hasVoted
                ? 'Quiz réussi ! Vous pouvez maintenant voter.'
                : !isQuizDone
                ? 'Commencez par le quiz pour débloquer votre vote.'
                : hasVoted
                ? `Vous avez voté ${voteRecord?.side?.toUpperCase()}. Participez au débat !`
                : 'Bon courage pour le quiz !'}
            </p>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            {step.locked ? (
              <div className="flex items-center gap-5 p-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed">
                <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                  <Lock size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-500">{step.label}</p>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                  <p className="text-xs text-gray-400 mt-1">🔒 Terminez le quiz d'abord</p>
                </div>
              </div>
            ) : (
              <Link
                href={step.href}
                className={[
                  'flex items-center gap-5 p-6 rounded-2xl border-2 transition-all hover:shadow-md',
                  step.done
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-bleu-republic',
                ].join(' ')}
              >
                <div className={[
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                  step.done ? 'bg-emerald-500 text-white' : 'bg-bleu-republic text-white',
                ].join(' ')}>
                  {step.done ? <CheckCircle size={22} /> : step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-gray-900">{step.label}</p>
                    {step.done && <span className="text-xs text-emerald-600 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">Fait ✓</span>}
                  </div>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xs font-bold text-or-civic bg-amber-50 px-3 py-1.5 rounded-full">
                    {step.points}
                  </span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Archives link */}
      <div className="mt-10 text-center">
        <Link href="/referendum/archives" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
          Voir les référendums précédents →
        </Link>
      </div>
    </div>
  )
}
