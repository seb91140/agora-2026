'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flame, Smartphone } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

const POC_CODE = 'AGORA2026'

export default function AuthPage() {
  const [code, setCode] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginWithCode } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.trim().toUpperCase() !== POC_CODE) {
      setError('Code invalide. Vérifiez le code POC indiqué ci-dessus.')
      return
    }
    if (pseudo.trim().length < 3) {
      setError('Votre pseudonyme doit faire au moins 3 caractères.')
      return
    }
    setLoading(true)
    await loginWithCode(pseudo.trim())
    toast(`Bienvenue, ${pseudo.trim()} !`)
    router.push('/referendum')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bleu-republic to-[#001a6e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-4 shadow-lg">
            <Flame size={28} className="text-bleu-republic" />
          </div>
          <h1 className="text-3xl font-black text-white">AGORA 2026</h1>
          <p className="text-white/70 mt-1 text-sm">La démocratie éclairée</p>
        </div>

        {/* POC Banner */}
        <div className="bg-or-civic rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
          <Smartphone size={20} className="text-white shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-black text-sm uppercase tracking-wider">POC — Code d'accès</p>
            <p className="text-white/90 text-sm mt-0.5">
              Entrez le code <strong className="text-white text-lg tracking-widest">AGORA2026</strong> pour accéder à la démo.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">
          <div>
            <h2 className="text-xl font-black text-gray-900">Accès démo</h2>
            <p className="text-gray-500 text-sm mt-1">
              Choisissez un pseudonyme public et entrez le code d'accès.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Votre pseudonyme public"
              type="text"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              placeholder="ex: CitoyenLucide42"
              hint="Visible dans le classement. 3-20 caractères."
              required
            />
            <Input
              label="Code d'accès"
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
              placeholder="••••••••"
              required
            />
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
            )}
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Accéder à AGORA
            </Button>
          </form>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          Version POC — Aucune donnée personnelle collectée.
        </p>
      </div>
    </div>
  )
}
