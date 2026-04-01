import type { ScoreTier } from '@/types'

export const POINTS = {
  QUIZ_PASSED:         15,
  VOTE_CAST:           10,
  ARGUMENT_SUBMITTED:   5,
  READ_OPPOSING:        5,
  ARGUMENT_UPVOTED:    10,  // earned when your argument reaches 3 upvotes
} as const

export function getTier(score: number): ScoreTier {
  if (score >= 500) return 'Ambassadeur'
  if (score >= 200) return 'Sénateur'
  if (score >= 75)  return 'Délégué'
  return 'Citoyen'
}

export function getTierColor(tier: ScoreTier): string {
  switch (tier) {
    case 'Ambassadeur': return 'bg-purple-100 text-purple-800 border-purple-300'
    case 'Sénateur':    return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'Délégué':     return 'bg-blue-100 text-blue-800 border-blue-300'
    default:            return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

export function getNextTierInfo(score: number): { next: ScoreTier; pointsNeeded: number } | null {
  if (score < 75)  return { next: 'Délégué',     pointsNeeded: 75  - score }
  if (score < 200) return { next: 'Sénateur',    pointsNeeded: 200 - score }
  if (score < 500) return { next: 'Ambassadeur', pointsNeeded: 500 - score }
  return null
}
