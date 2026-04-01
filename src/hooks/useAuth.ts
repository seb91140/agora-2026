'use client'
import { useState, useCallback, useEffect } from 'react'
import type { User } from '@/types'
import { STORAGE_KEYS } from '@/lib/storage-keys'
import { hashPassword, generateUserId, validateEmail, validatePseudonym, validatePassword } from '@/lib/auth-utils'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setLoading(false)
  }, [])

  const persistUser = (u: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u))
    setUser(u)
  }

  const register = useCallback(async (
    email: string,
    pseudonym: string,
    password: string,
  ): Promise<string | null> => {
    if (!validateEmail(email)) return 'Email invalide'
    const pseudoError = validatePseudonym(pseudonym)
    if (pseudoError) return pseudoError
    const passError = validatePassword(password)
    if (passError) return passError

    const registry: Record<string, string> = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.USERS_REGISTRY) || '{}',
    )
    if (Object.values(registry).includes(email)) return 'Cet email est déjà utilisé'
    if (registry[pseudonym.toLowerCase()]) return 'Ce pseudonyme est déjà pris'

    const passwordHash = await hashPassword(password)
    const newUser: User = {
      id: generateUserId(),
      pseudonym,
      email,
      passwordHash,
      score: 0,
      badges: [],
      createdAt: new Date().toISOString(),
      votedWeeks: [],
      quizPassedWeeks: [],
      fairPlayWeeks: [],
    }

    registry[pseudonym.toLowerCase()] = email
    localStorage.setItem(STORAGE_KEYS.USERS_REGISTRY, JSON.stringify(registry))
    persistUser(newUser)
    return null
  }, [])

  const login = useCallback(async (
    email: string,
    password: string,
  ): Promise<string | null> => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    if (!raw) return "Aucun compte trouvé. Inscrivez-vous d'abord."
    const stored: User = JSON.parse(raw)
    if (stored.email !== email) return 'Email ou mot de passe incorrect'
    const hash = await hashPassword(password)
    if (stored.passwordHash !== hash) return 'Email ou mot de passe incorrect'
    setUser(stored)
    return null
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...updates }
    persistUser(updated)
  }, [user])

  const addPoints = useCallback((points: number) => {
    if (!user) return
    const updated = { ...user, score: user.score + points }
    persistUser(updated)
  }, [user])

  return { user, loading, register, login, logout, updateUser, addPoints, isAuthenticated: !!user }
}
