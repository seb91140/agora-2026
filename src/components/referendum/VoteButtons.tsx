'use client'
import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

interface VoteButtonsProps {
  onVote: (side: 'pour' | 'contre') => void
  disabled?: boolean
}

export function VoteButtons({ onVote, disabled }: VoteButtonsProps) {
  const [pending, setPending] = useState<'pour' | 'contre' | null>(null)

  const confirm = () => {
    if (pending) {
      onVote(pending)
      setPending(null)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={disabled}
          onClick={() => setPending('pour')}
          className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-transparent
            bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-500 transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center
            group-hover:scale-110 transition-transform duration-200 shadow-lg">
            <ThumbsUp size={28} className="text-white" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-700">POUR</p>
            <p className="text-sm text-emerald-600 font-medium mt-1">Je suis favorable</p>
          </div>
        </button>

        <button
          disabled={disabled}
          onClick={() => setPending('contre')}
          className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-transparent
            bg-red-50 hover:bg-red-100 hover:border-red-500 transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="w-16 h-16 rounded-full bg-rouge-marianne flex items-center justify-center
            group-hover:scale-110 transition-transform duration-200 shadow-lg">
            <ThumbsDown size={28} className="text-white" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-rouge-marianne">CONTRE</p>
            <p className="text-sm text-red-600 font-medium mt-1">Je m'y oppose</p>
          </div>
        </button>
      </div>

      <Modal
        open={!!pending}
        onClose={() => setPending(null)}
        title="Confirmer votre vote"
      >
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Vous êtes sur le point de voter{' '}
            <strong className={pending === 'pour' ? 'text-emerald-600' : 'text-rouge-marianne'}>
              {pending?.toUpperCase()}
            </strong>
            . Ce choix est définitif et ne peut pas être modifié.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" fullWidth onClick={() => setPending(null)}>Annuler</Button>
            <Button
              variant={pending === 'pour' ? 'pour' : 'contre'}
              fullWidth
              onClick={confirm}
            >
              Confirmer — {pending?.toUpperCase()}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
