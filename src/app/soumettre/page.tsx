'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage-keys'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { CheckCircle, Lightbulb, Users, Flame } from 'lucide-react'
import type { SubmittedQuestion, ReferendumQuestion } from '@/types'

const CATEGORIES: { value: ReferendumQuestion['category']; label: string }[] = [
  { value: 'democratie',    label: 'Démocratie & Institutions' },
  { value: 'social',        label: 'Social & Éducation' },
  { value: 'economie',      label: 'Économie & Travail' },
  { value: 'environnement', label: 'Environnement & Énergie' },
  { value: 'justice',       label: 'Justice & Libertés' },
]

export default function SoumettreePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const [submitted, setSubmitted] = useLocalStorage<SubmittedQuestion[]>(STORAGE_KEYS.SUBMITTED_QS, [])
  const [question, setQuestion] = useState('')
  const [justification, setJustification] = useState('')
  const [category, setCategory] = useState<ReferendumQuestion['category']>('democratie')
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/auth')
  }, [loading, isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim().length < 20) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 800)) // simulate network
    const newQ: SubmittedQuestion = {
      id: `sq-${Date.now()}`,
      question: question.trim(),
      justification: justification.trim(),
      category,
      submittedAt: new Date().toISOString(),
      submittedBy: user?.pseudonym ?? 'Anonyme',
      status: 'pending',
    }
    setSubmitted(prev => [...prev, newQ])
    setDone(true)
    setSubmitting(false)
    toast('Question soumise à la communauté ! Merci pour votre contribution.')
  }

  const mySubmissions = submitted.filter(q => q.submittedBy === user?.pseudonym)

  if (loading) return null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={20} className="text-or-civic" />
          <p className="text-xs font-semibold text-or-civic uppercase tracking-wider">Proposer un Référendum</p>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Votre idée, le débat national</h1>
        <p className="text-gray-500 text-sm">
          Si la communauté plébiscite votre question, elle devient le référendum officiel de la semaine suivante.
          Soyez précis, sourcé, et respectueux.
        </p>
      </div>

      {/* Rules */}
      <div className="bg-blue-50 rounded-2xl p-5 mb-8 space-y-2">
        {[
          { icon: <Flame size={14} className="text-bleu-republic" />, text: 'La question doit concerner toute la France, pas un intérêt local.' },
          { icon: <Users size={14} className="text-bleu-republic" />, text: "Elle doit avoir deux camps clairement défendables (Pour / Contre)." },
          { icon: <CheckCircle size={14} className="text-bleu-republic" />, text: "Elle sera vérifiée par la communauté avant d'être mise aux votes." },
        ].map((rule, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="shrink-0 mt-0.5">{rule.icon}</div>
            <p className="text-sm text-blue-800">{rule.text}</p>
          </div>
        ))}
      </div>

      {done ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Question soumise !</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            La communauté AGORA va voter pour choisir la question de la semaine prochaine.
            Si la vôtre est plébiscitée, vous gagnerez <strong>+20 points</strong> et un badge spécial.
          </p>
          <Button onClick={() => { setDone(false); setQuestion(''); setJustification('') }} variant="secondary">
            Soumettre une autre question
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={[
                    'px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all text-left',
                    category === c.value
                      ? 'bg-bleu-republic text-white border-bleu-republic'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400',
                  ].join(' ')}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            label="Votre question de référendum"
            placeholder="Ex : Faut-il instaurer le revenu universel de base en France à 800€ par mois ?"
            rows={3}
            maxLength={200}
            currentLength={question.length}
            value={question}
            onChange={e => setQuestion(e.target.value.slice(0, 200))}
          />

          <Textarea
            label="Pourquoi ce sujet mérite-t-il un débat national ?"
            placeholder="Expliquez l'actualité, les enjeux, les sources... Plus vous serez précis, plus la communauté vous soutiendra."
            rows={5}
            maxLength={800}
            currentLength={justification.length}
            value={justification}
            onChange={e => setJustification(e.target.value.slice(0, 800))}
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={submitting}
            disabled={question.trim().length < 20}
          >
            Soumettre ma question à la communauté
          </Button>
        </form>
      )}

      {/* Previous submissions */}
      {mySubmissions.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Vos propositions</h2>
          <div className="space-y-3">
            {mySubmissions.map(q => (
              <div key={q.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-gray-800">{q.question}</p>
                  <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                    q.status === 'validated' ? 'bg-emerald-100 text-emerald-700' :
                    q.status === 'rejected' ? 'bg-red-50 text-rouge-marianne' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {q.status === 'validated' ? 'Validée' : q.status === 'rejected' ? 'Rejetée' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
