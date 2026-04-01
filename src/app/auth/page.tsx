'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flame } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Register form
  const [regEmail, setRegEmail] = useState('')
  const [regPseudo, setRegPseudo] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regError, setRegError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoginError('')
    const err = await login(loginEmail, loginPassword)
    setLoading(false)
    if (err) { setLoginError(err); return }
    toast('Bienvenue sur AGORA !')
    router.push('/referendum')
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setRegError('')
    const err = await register(regEmail, regPseudo, regPassword)
    setLoading(false)
    if (err) { setRegError(err); return }
    toast(`Bienvenue, ${regPseudo} ! +15 pts offerts pour votre premier vote.`)
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

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  'py-4 text-sm font-semibold transition-colors',
                  tab === t
                    ? 'bg-white text-bleu-republic border-b-2 border-bleu-republic'
                    : 'text-gray-500 hover:text-gray-700',
                ].join(' ')}
              >
                {t === 'login' ? 'Se connecter' : 'S\'inscrire'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <p className="text-gray-500 text-sm mb-6">
                  Reconnectez-vous pour continuer à débattre et grimper dans le classement.
                </p>
                <Input
                  label="Email"
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="vous@exemple.fr"
                  required
                />
                <Input
                  label="Mot de passe"
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                {loginError && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{loginError}</p>
                )}
                <Button type="submit" fullWidth size="lg" loading={loading}>
                  Se connecter
                </Button>
                <p className="text-center text-xs text-gray-400">
                  Pas encore de compte ?{' '}
                  <button type="button" onClick={() => setTab('register')} className="text-bleu-republic font-semibold hover:underline">
                    S'inscrire gratuitement
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <p className="text-gray-500 text-sm mb-6">
                  Créez votre compte citoyen. Votre identité réelle reste privée — seul votre pseudonyme est visible.
                </p>
                <Input
                  label="Email"
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="vous@exemple.fr"
                  required
                />
                <Input
                  label="Pseudonyme public"
                  type="text"
                  value={regPseudo}
                  onChange={e => setRegPseudo(e.target.value)}
                  placeholder="ex: CitoyenLucide42"
                  hint="Visible dans le classement. 3-20 caractères."
                  required
                />
                <Input
                  label="Mot de passe"
                  type="password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="8 caractères minimum"
                  required
                />
                {regError && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{regError}</p>
                )}
                <Button type="submit" fullWidth size="lg" loading={loading}>
                  Créer mon compte citoyen
                </Button>
                <p className="text-center text-xs text-gray-400">
                  Déjà un compte ?{' '}
                  <button type="button" onClick={() => setTab('login')} className="text-bleu-republic font-semibold hover:underline">
                    Se connecter
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          Aucune donnée personnelle vendue. Aucune publicité. Jamais.
        </p>
      </div>
    </div>
  )
}
