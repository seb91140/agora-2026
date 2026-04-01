import Link from 'next/link'
import { archivedReferendums } from '@/data/archived-referendums'
import { formatShortDate } from '@/lib/date-utils'
import { Archive, TrendingUp, TrendingDown, Users } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  democratie: 'Démocratie', social: 'Social', economie: 'Économie',
  environnement: 'Environnement', justice: 'Justice',
}
const categoryColors: Record<string, string> = {
  democratie: 'bg-blue-100 text-blue-700',
  social: 'bg-purple-100 text-purple-700',
  economie: 'bg-green-100 text-green-700',
  environnement: 'bg-emerald-100 text-emerald-700',
  justice: 'bg-orange-100 text-orange-700',
}

export default function ArchivesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Archive size={20} className="text-bleu-republic" />
          <p className="text-xs font-semibold text-bleu-republic uppercase tracking-wider">Archives</p>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Référendums précédents</h1>
        <p className="text-gray-500 mt-2 text-sm">
          L'historique de tous les référendums AGORA avec leurs résultats définitifs.
        </p>
      </div>

      <div className="space-y-4">
        {archivedReferendums.map(ref => (
          <div key={ref.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[ref.category]}`}>
                    {categoryLabels[ref.category]}
                  </span>
                  <span className="text-xs text-gray-400">{formatShortDate(ref.closedAt)}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{ref.title}</h3>

                {/* Mini results */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-sm font-black text-emerald-600">{ref.finalPour}%</span>
                    <span className="text-xs text-gray-400">Pour</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingDown size={14} className="text-rouge-marianne" />
                    <span className="text-sm font-black text-rouge-marianne">{ref.finalContre}%</span>
                    <span className="text-xs text-gray-400">Contre</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{ref.totalVotes.toLocaleString('fr-FR')} votes</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${ref.finalPour}%` }}
                  />
                </div>
              </div>

              {/* Winner tag */}
              <div className={`shrink-0 px-4 py-2 rounded-xl text-center font-black text-lg ${
                ref.finalPour > 50
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-rouge-marianne'
              }`}>
                {ref.finalPour > 50 ? 'POUR' : 'CONTRE'}
                <p className="text-xs font-normal text-gray-400 mt-0.5">Résultat</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
