'use client'
import { useMemo } from 'react'
import { mockLeaderboard } from '@/data/mock-leaderboard'
import { STORAGE_KEYS } from '@/lib/storage-keys'
import { getTier } from '@/lib/scoring'
import type { LeaderboardEntry, User } from '@/types'

export function useLeaderboard(currentUser: User | null): LeaderboardEntry[] {
  return useMemo(() => {
    if (typeof window === 'undefined') return mockLeaderboard

    const entries: LeaderboardEntry[] = [...mockLeaderboard]

    if (currentUser && currentUser.score > 0) {
      const existingIdx = entries.findIndex(
        e => e.pseudonym.toLowerCase() === currentUser.pseudonym.toLowerCase(),
      )
      const userEntry: LeaderboardEntry = {
        rank: 0,
        pseudonym: currentUser.pseudonym,
        score: currentUser.score,
        tier: getTier(currentUser.score),
        badges: currentUser.badges.length,
        isCurrentUser: true,
      }
      if (existingIdx >= 0) {
        entries[existingIdx] = userEntry
      } else {
        entries.push(userEntry)
      }
    }

    entries.sort((a, b) => b.score - a.score)
    return entries.map((e, i) => ({ ...e, rank: i + 1 }))
  }, [currentUser])
}
