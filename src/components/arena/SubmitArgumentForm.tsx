'use client'
import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { ArgumentSide } from '@/types'

interface SubmitArgumentFormProps {
  onSubmit: (body: string, side: ArgumentSide) => void
}

const MAX = 400

export function SubmitArgumentForm({ onSubmit }: SubmitArgumentFormProps) {
  const [body, setBody] = useState('')
  const [side, setSide] = useState<ArgumentSide>('pour')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (body.trim().length < 80) {
      setError('Votre argument doit faire au moins 80 caractères pour être pris au sérieux.')
      return
    }
    onSubmit(body.trim(), side)
    setBody('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6">
      <h3 className="font-bold text-gray-900">Ajouter votre argument</h3>

      {/* Side selector */}
      <div className="flex gap-3">
        {(['pour', 'contre'] as ArgumentSide[]).map(s => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all',
              side === s
                ? s === 'pour'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-rouge-marianne text-white border-rouge-marianne'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400',
            ].join(' ')}
          >
            {s === 'pour' ? <ThumbsUp size={14} /> : <ThumbsDown size={14} />}
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <Textarea
        label="Votre argument"
        placeholder="Expliquez votre position avec des faits, des chiffres ou des références. Soyez précis et respectueux."
        rows={4}
        maxLength={MAX}
        currentLength={body.length}
        value={body}
        onChange={e => { setBody(e.target.value.slice(0, MAX)); setError('') }}
        error={error}
      />

      <Button type="submit" disabled={body.trim().length < 80} fullWidth>
        Soumettre mon argument
      </Button>
    </form>
  )
}
