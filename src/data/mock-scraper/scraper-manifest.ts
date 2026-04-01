import type { ScraperManifest } from '@/types'

// Ce fichier simule la sortie d'un scraper automatisé (cron job).
// En production, un service Python/Node écrirait ce fichier toutes les heures.
export const scraperManifest: ScraperManifest = {
  lastRun:        '2026-03-30T07:45:12.000Z',
  sourcesChecked: 14,
  articlesFound:  31,
  status:         'success',
  weekId:         '2026-W14',
}
