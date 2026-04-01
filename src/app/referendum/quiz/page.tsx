'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useQuiz } from '@/hooks/useQuiz'
import { QuizFlow } from '@/components/referendum/QuizFlow'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { currentReferendum } from '@/data/current-referendum'
import { quizQuestions } from '@/data/quiz-questions'
import { POINTS } from '@/lib/scoring'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'

export default function QuizPage() {
  const { user, isAuthenticated, loading, addPoints, updateUser } = useAuth()
  const { isQuizDone, completion, completeQuiz } = useQuiz(currentReferendum.weekId)
  const { toast } = useToast()
  const router = useRouter()
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/auth')
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    if (isQuizDone && completion) {
      setDone(true)
      setFinalScore(completion.score)
    }
  }, [isQuizDone, completion])

  const questions = quizQuestions[currentReferendum.id] ?? []

  const handleComplete = (score: number) => {
    const passed = completeQuiz(currentReferendum.id, score)
    setFinalScore(score)
    setDone(true)
    if (passed) {
      addPoints(POINTS.QUIZ_PASSED)
      if (user) {
        updateUser({
          quizPassedWeeks: [...(user.quizPassedWeeks ?? []), currentReferendum.weekId],
        })
      }
      toast(`Quiz réussi ! +${POINTS.QUIZ_PASSED} points`)
    } else {
      toast('Quiz terminé. Lisez le texte et réessayez !', 'info')
    }
  }

  if (loading) return null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold text-bleu-republic uppercase tracking-wider mb-2">
          Quiz de validation
        </p>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          Prouvez que vous comprenez les enjeux
        </h1>
        <p className="text-gray-500 text-sm">
          2 bonnes réponses sur 3 pour débloquer votre vote. Pas de triche — lisez le texte complet d'abord.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        {!done ? (
          <QuizFlow questions={questions} onComplete={handleComplete} />
        ) : (
          <div className="text-center space-y-6 py-4 animate-fade-in">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
              finalScore >= 2 ? 'bg-emerald-100' : 'bg-red-50'
            }`}>
              {finalScore >= 2
                ? <CheckCircle size={40} className="text-emerald-500" />
                : <XCircle size={40} className="text-red-400" />}
            </div>

            <div>
              <p className="text-3xl font-black text-gray-900">{finalScore}/3</p>
              <p className={`text-lg font-bold mt-1 ${finalScore >= 2 ? 'text-emerald-600' : 'text-red-500'}`}>
                {finalScore >= 2 ? 'Quiz réussi !' : 'Pas tout à fait…'}
              </p>
              {finalScore >= 2 ? (
                <p className="text-gray-500 text-sm mt-2">
                  Excellent ! Vous maîtrisez les enjeux de ce référendum. Votre vote est débloqué.
                </p>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  Il faut au moins 2 bonnes réponses. Relisez le texte complet et réessayez.
                </p>
              )}
            </div>

            {finalScore >= 2 ? (
              <Button size="lg" onClick={() => router.push('/referendum/vote')}>
                Aller voter <ArrowRight size={16} />
              </Button>
            ) : (
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={() => router.push('/referendum')}>
                  Relire le texte
                </Button>
                <Button onClick={() => { setDone(false); setFinalScore(0) }}>
                  Réessayer le quiz
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
