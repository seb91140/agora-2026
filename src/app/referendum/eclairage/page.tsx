import { Clock, FlaskConical, History, ExternalLink, Cpu } from 'lucide-react'
import { contextBlocks, scrapedArticles } from '@/data/mock-scraper/scraped-context'
import { scraperManifest } from '@/data/mock-scraper/scraper-manifest'
import { currentReferendum } from '@/data/current-referendum'
import { formatShortDate } from '@/lib/date-utils'

export default function EclairagePage() {
  const historical = contextBlocks.filter(b => b.type === 'historical')
  const scientific  = contextBlocks.filter(b => b.type === 'scientific')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-bleu-republic uppercase tracking-wider mb-2">
          Éclairage Scientifique & Historique
        </p>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          {currentReferendum.title}
        </h1>

        {/* Scraper notice */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mt-4">
          <Cpu size={16} className="text-bleu-republic shrink-0" />
          <p className="text-xs text-gray-600">
            Données agrégées automatiquement le{' '}
            <strong>{formatShortDate(scraperManifest.lastRun)}</strong>.{' '}
            {scraperManifest.sourcesChecked} sources surveillées ·{' '}
            {scraperManifest.articlesFound} articles analysés.
            <a href="#" className="ml-1 text-bleu-republic hover:underline">Voir la méthode →</a>
          </p>
        </div>
      </div>

      {/* Historical */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <History size={20} className="text-amber-600" />
          <h2 className="text-xl font-black text-gray-900">Précédents Historiques</h2>
        </div>
        <div className="space-y-6">
          {historical.map(block => (
            <div key={block.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-gray-900">{block.title}</h3>
                  {block.country && (
                    <span className="shrink-0 text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                      {block.country} · {block.year}
                    </span>
                  )}
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 text-sm leading-relaxed">{block.body}</p>
                <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                  <ExternalLink size={11} />
                  {block.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scientific */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <FlaskConical size={20} className="text-bleu-republic" />
          <h2 className="text-xl font-black text-gray-900">Ce que dit la Recherche</h2>
        </div>
        <div className="space-y-6">
          {scientific.map(block => (
            <div key={block.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-gray-900">{block.title}</h3>
                  <span className="shrink-0 text-xs font-semibold bg-blue-100 text-bleu-republic px-3 py-1 rounded-full">
                    Étude {block.year}
                  </span>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 text-sm leading-relaxed">{block.body}</p>
                <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                  <ExternalLink size={11} />
                  {block.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent articles */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Clock size={20} className="text-gray-500" />
          <h2 className="text-xl font-black text-gray-900">Actualités Récentes</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {scrapedArticles.map(article => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-bleu-republic bg-blue-50 px-2 py-0.5 rounded-full">
                  {article.source}
                </span>
                <span className="text-xs text-gray-400">{formatShortDate(article.publishedAt)}</span>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-2 leading-snug">{article.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{article.summary}</p>
              <p className="text-xs text-bleu-republic mt-3 flex items-center gap-1">
                Lire l'article <ExternalLink size={11} />
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
