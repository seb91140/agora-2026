'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getTier, getTierColor } from '@/lib/scoring'
import { Vote, Trophy, PlusCircle, User, LogOut, Flame } from 'lucide-react'

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()

  const navLinks = [
    { href: '/referendum', label: 'Voter', icon: <Vote size={16} /> },
    { href: '/classement', label: 'Classement', icon: <Trophy size={16} /> },
    { href: '/soumettre', label: 'Proposer', icon: <PlusCircle size={16} /> },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-bleu-republic rounded-lg">
            <Flame size={16} className="text-white" />
          </div>
          <span className="font-black text-lg text-bleu-republic tracking-tight">AGORA</span>
          <span className="text-xs font-bold text-or-civic bg-or-civic-light px-2 py-0.5 rounded-full">2026</span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname.startsWith(link.href)
                  ? 'bg-blue-50 text-bleu-republic'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              ].join(' ')}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* User section */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated && user ? (
            <>
              <Link
                href="/profil"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 bg-bleu-republic rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.pseudonym[0].toUpperCase()}
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-gray-800 leading-none">{user.pseudonym}</p>
                  <p className="text-xs text-or-civic font-bold">{user.score} pts</p>
                </div>
                <span className={`hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full border ${getTierColor(getTier(user.score))}`}>
                  {getTier(user.score)}
                </span>
              </Link>
              <button
                onClick={logout}
                title="Se déconnecter"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-1.5 px-4 py-2 bg-bleu-republic text-white rounded-xl text-sm font-semibold hover:bg-bleu-republic-600 transition-colors"
            >
              <User size={15} />
              Rejoindre
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
