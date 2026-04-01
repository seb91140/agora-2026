'use client'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage-keys'
import type { QuizCompletion } from '@/types'

export function useQuiz(weekId: string) {
  const key = STORAGE_KEYS.quiz(weekId)
  const [completion, setCompletion] = useLocalStorage<QuizCompletion | null>(key, null)

  const completeQuiz = useCallback((referendumId: string, score: number) => {
    const record: QuizCompletion = {
      referendumId,
      completedAt: new Date().toISOString(),
      score,
      passed: score >= 2,
    }
    setCompletion(record)
    return record.passed
  }, [setCompletion])

  return {
    completion,
    isQuizDone: !!completion,
    hasPassedQuiz: completion?.passed ?? false,
    completeQuiz,
  }
}
