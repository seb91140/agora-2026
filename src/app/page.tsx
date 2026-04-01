import Link from 'next/link'
import { ArrowRight, Vote, Shield, Brain, Trophy, Clock, Users, Zap } from 'lucide-react'
import { currentReferendum } from '@/data/current-referendum'
import { getTimeRemaining, formatShortDate } from '@/lib/date-utils'

export default function HomePage() {
  const timeLeft = getTimeRemaining(currentReferendum.expiresAt)
  const categoryLabels: Record<string, string> = {
    democratie: 'Démocratie',
    social: 'Social',
    economie: 'Économie',
    environnement: 'Environnement',
    justice: 'Justice',
  }
  const categoryColors: Record<string, string> = {
    democratie: 'bg-blue-100 text-blue-800',
    social: 'bg-purple-100 text-purple-800',
    economie: 'bg-green-100 text-green-800',
    environnement: 'bg-emerald-100 text-emerald-800',
    justice: 'bg-orange-100 text-orange-800',
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-bleu-republic to-[#001a6e] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-or-civic text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Semaine du {formatShortDate(currentReferendum.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                <Clock size={12} />
                {timeLeft}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
              {currentReferendum.title}
            </h1>

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              {currentReferendum.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/referendum"
                className="inline-flex items-center gap-2 bg-white text-bleu-republic px-7 py-3.5 rounded-xl font-bold text-base hover:bg-gray-50 transition-colors shadow-lg"
              >
                <Vote size={18} />
                Voter maintenant
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Users size={16} />
                <span>{currentReferendum.totalVotes.toLocaleString('fr-FR')} citoyens ont voté</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-3">Comment ça marche ?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Pas de vote à l'aveugle. Chaque référendum est un parcours qui vous rend plus éclairé.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Brain size={24} className="text-bleu-republic" />,
              title: '1. Le Quiz',
              desc: 'Répondez à 3 questions pour prouver que vous avez compris les enjeux. Pas de compréhension, pas de vote.',
              color: 'bg-blue-50',
            },
            {
              icon: <Vote size={24} className="text-emerald-600" />,
              title: '2. Votre Vote',
              desc: 'Pour ou Contre. Un vote anonyme, un vote éclairé. Découvrez les résultats en temps réel.',
              color: 'bg-emerald-50',
            },
            {
              icon: <Shield size={24} className="text-purple-600" />,
              title: "3. L'Arène",
              desc: 'Lisez les meilleurs arguments des deux camps. Soumettez le vôtre. Gagnez des badges si vos idées convainquent.',
              color: 'bg-purple-50',
            },
            {
              icon: <Zap size={24} className="text-or-civic" />,
              title: "4. L'Éclairage",
              desc: "L'IA agrège histoire et science pour chaque question. Qu'a-t-on testé en Suède ? Que dit la recherche ?",
              color: 'bg-amber-50',
            },
          ].map((step, i) => (
            <div key={i} className={`${step.color} rounded-2xl p-6`}>
              <div className="mb-4">{step.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current question preview */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${categoryColors[currentReferendum.category]}`}>
                {categoryLabels[currentReferendum.category]}
              </span>
              <h2 className="text-2xl font-black text-gray-900 mb-4">{currentReferendum.title}</h2>
              <div className="prose prose-sm text-gray-600 max-w-none">
                <p className="leading-relaxed">{currentReferendum.summary}</p>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Source : {currentReferendum.source}
              </p>
            </div>

            <div className="w-full lg:w-80 shrink-0 space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Résultats en direct</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-bold text-emerald-600">POUR</span>
                      <span className="font-black">{currentReferendum.pourPercent}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${currentReferendum.pourPercent}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-bold text-rouge-marianne">CONTRE</span>
                      <span className="font-black">{100 - currentReferendum.pourPercent}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rouge-marianne rounded-full"
                        style={{ width: `${100 - currentReferendum.pourPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {currentReferendum.totalVotes.toLocaleString('fr-FR')} votes
                </p>
              </div>

              <Link
                href="/referendum"
                className="flex items-center justify-center gap-2 w-full bg-bleu-republic text-white px-6 py-3.5 rounded-xl font-bold hover:bg-bleu-republic-600 transition-colors"
              >
                Participer au débat
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA classement */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={20} className="text-or-civic" />
              <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Classement National</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Qui sont les citoyens les plus éclairés de France ?
            </h2>
            <p className="text-gray-600 text-sm">
              Chaque vote, chaque argument, chaque débat vous rapporte des points. Grimpez vers le titre d'Ambassadeur.
            </p>
          </div>
          <Link
            href="/classement"
            className="shrink-0 inline-flex items-center gap-2 bg-or-civic text-white px-6 py-3.5 rounded-xl font-bold hover:bg-amber-500 transition-colors"
          >
            <Trophy size={18} />
            Voir le classement
          </Link>
        </div>
      </section>
    </div>
  )
}
