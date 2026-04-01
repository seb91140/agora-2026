'use client'
import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { QuizQuestion } from '@/types'

interface QuizFlowProps {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
}

export function QuizFlow({ questions, onComplete }: QuizFlowProps) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  const current = questions[step]
  const isLast = step === questions.length - 1
  const score = answers.filter(Boolean).length

  const handleSelect = (idx: number) => {
    if (revealed) return
    setSelected(idx)
  }

  const handleReveal = () => {
    if (selected === null) return
    setRevealed(true)
    setAnswers(prev => [...prev, selected === current.correctIndex])
  }

  const handleNext = () => {
    if (isLast) {
      const finalScore = answers.filter(Boolean).length + (selected === current.correctIndex ? 1 : 0)
      onComplete(finalScore)
    } else {
      setStep(s => s + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  if (!current) return null

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        {questions.map((_, i) => (
          <div
            key={i}
            className={[
              'h-1.5 flex-1 rounded-full transition-colors duration-300',
              i < step ? 'bg-emerald-500' : i === step ? 'bg-bleu-republic' : 'bg-gray-200',
            ].join(' ')}
          />
        ))}
        <span className="text-xs text-gray-500 shrink-0">{step + 1}/{questions.length}</span>
      </div>

      {/* Question */}
      <div>
        <p className="text-xs font-semibold text-bleu-republic uppercase tracking-wider mb-2">
          Question {step + 1}
        </p>
        <h3 className="text-xl font-bold text-gray-900 leading-snug">{current.question}</h3>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {current.options.map((option, idx) => {
          let style = 'border-gray-200 bg-white hover:border-bleu-republic hover:bg-blue-50 cursor-pointer'
          if (revealed) {
            if (idx === current.correctIndex) style = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (idx === selected) style = 'border-red-400 bg-red-50 cursor-default'
            else style = 'border-gray-100 bg-gray-50 text-gray-400 cursor-default'
          } else if (idx === selected) {
            style = 'border-bleu-republic bg-blue-50 cursor-pointer'
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 ${style}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-sm">{option}</span>
                {revealed && idx === current.correctIndex && <CheckCircle size={18} className="text-emerald-500 shrink-0" />}
                {revealed && idx === selected && idx !== current.correctIndex && <XCircle size={18} className="text-red-500 shrink-0" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-fade-in">
          <div className="flex gap-2">
            <Award size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">{current.explanation}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!revealed ? (
          <Button onClick={handleReveal} disabled={selected === null} size="lg">
            Vérifier ma réponse
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg">
            {isLast ? 'Voir mes résultats' : 'Question suivante'}
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
