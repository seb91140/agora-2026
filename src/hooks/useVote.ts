'use client'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage-keys'
import type { VoteRecord } from '@/types'

export function useVote(weekId: string) {
  const key = STORAGE_KEYS.vote(weekId)
  const [voteRecord, setVoteRecord] = useLocalStorage<VoteRecord | null>(key, null)

  const castVote = useCallback((referendumId: string, side: 'pour' | 'contre') => {
    const record: VoteRecord = {
      referendumId,
      side,
      votedAt: new Date().toISOString(),
    }
    setVoteRecord(record)
  }, [setVoteRecord])

  return {
    voteRecord,
    hasVoted: !!voteRecord,
    castVote,
  }
}
