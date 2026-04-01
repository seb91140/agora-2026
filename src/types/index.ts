// ─── Referendum ──────────────────────────────────────────────────────────────

export interface ReferendumQuestion {
  id: string
  weekId: string           // "2026-W14"
  title: string
  summary: string
  fullText: string
  category: 'democratie' | 'social' | 'economie' | 'environnement' | 'justice'
  publishedAt: string      // ISO date
  expiresAt: string        // ISO date
  source: string
  sourceUrl: string
  totalVotes: number       // seed count for realism
  pourPercent: number      // seed percentage
}

export interface QuizQuestion {
  id: string
  referendumId: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface QuizCompletion {
  referendumId: string
  completedAt: string
  score: number            // 0-3 correct
  passed: boolean
}

export interface VoteRecord {
  referendumId: string
  side: 'pour' | 'contre'
  votedAt: string
}

export interface ArchiveEntry {
  id: string
  weekId: string
  title: string
  category: ReferendumQuestion['category']
  finalPour: number
  finalContre: number
  totalVotes: number
  closedAt: string
  topArgPour: string
  topArgContre: string
}

// ─── Arguments ───────────────────────────────────────────────────────────────

export type ArgumentSide = 'pour' | 'contre'

export interface Argument {
  id: string
  referendumId: string
  side: ArgumentSide
  body: string
  authorPseudonym: string
  upvotes: number
  createdAt: string
  isMock: boolean
}

// ─── User / Scoring ──────────────────────────────────────────────────────────

export type ScoreTier = 'Citoyen' | 'Délégué' | 'Sénateur' | 'Ambassadeur'

export interface Badge {
  id: string
  label: string
  icon: string
  earnedAt: string
}

export interface User {
  id: string
  pseudonym: string
  email: string
  passwordHash: string
  score: number
  badges: Badge[]
  createdAt: string
  votedWeeks: string[]
  quizPassedWeeks: string[]
  fairPlayWeeks: string[]  // weeks where they read opposing arguments
}

export interface LeaderboardEntry {
  rank: number
  pseudonym: string
  score: number
  tier: ScoreTier
  badges: number
  isCurrentUser?: boolean
}

// ─── Scraper ─────────────────────────────────────────────────────────────────

export interface ScraperManifest {
  lastRun: string
  sourcesChecked: number
  articlesFound: number
  status: 'success' | 'partial' | 'error'
  weekId: string
}

export interface ScrapedArticle {
  id: string
  title: string
  source: string
  url: string
  publishedAt: string
  summary: string
  type: 'scientific' | 'historical' | 'news'
}

export interface ContextBlock {
  id: string
  type: 'scientific' | 'historical'
  title: string
  body: string
  source: string
  year: number
  country?: string
}

export interface SubmittedQuestion {
  id: string
  question: string
  justification: string
  category: ReferendumQuestion['category']
  submittedAt: string
  submittedBy: string
  status: 'pending' | 'validated' | 'rejected'
}
