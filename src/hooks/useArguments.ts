'use client'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage-keys'
import { mockArguments } from '@/data/mock-arguments'
import type { Argument, ArgumentSide } from '@/types'

export function useArguments(weekId: string, referendumId: string) {
  const argsKey = STORAGE_KEYS.args(weekId)
  const upvotesKey = STORAGE_KEYS.upvotes(weekId)
  const fairPlayKey = STORAGE_KEYS.fairPlay(weekId)

  const [userArgs, setUserArgs] = useLocalStorage<Argument[]>(argsKey, [])
  const [upvoted, setUpvoted] = useLocalStorage<Record<string, boolean>>(upvotesKey, {})
  const [fairPlayRecorded, setFairPlayRecorded] = useLocalStorage<boolean>(fairPlayKey, false)

  const allArguments = [...mockArguments, ...userArgs]
  const pourArgs = allArguments
    .filter(a => a.side === 'pour')
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3)
  const contreArgs = allArguments
    .filter(a => a.side === 'contre')
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3)

  const submitArgument = useCallback((
    body: string,
    side: ArgumentSide,
    authorPseudonym: string,
  ): Argument => {
    const newArg: Argument = {
      id: `arg-user-${Date.now()}`,
      referendumId,
      side,
      body,
      authorPseudonym,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      isMock: false,
    }
    setUserArgs(prev => [...prev, newArg])
    return newArg
  }, [referendumId, setUserArgs])

  const upvoteArgument = useCallback((argId: string) => {
    if (upvoted[argId]) return
    setUpvoted(prev => ({ ...prev, [argId]: true }))
    // Update upvote count on user args
    setUserArgs(prev =>
      prev.map(a => a.id === argId ? { ...a, upvotes: a.upvotes + 1 } : a),
    )
  }, [upvoted, setUpvoted, setUserArgs])

  const recordFairPlay = useCallback(() => {
    if (!fairPlayRecorded) {
      setFairPlayRecorded(true)
      return true
    }
    return false
  }, [fairPlayRecorded, setFairPlayRecorded])

  return {
    pourArgs,
    contreArgs,
    allArguments,
    userArgs,
    submitArgument,
    upvoteArgument,
    upvoted,
    fairPlayRecorded,
    recordFairPlay,
  }
}
