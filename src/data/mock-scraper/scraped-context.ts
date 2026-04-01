import type { ContextBlock, ScrapedArticle } from '@/types'

// Interface contrat du scraper :
// Un vrai scraper (cron Python/Node) doit produire des données de cette forme exacte.
// Sources surveillées : Sénat.fr, Assemblée Nationale, INSEE, PubMed, Le Monde, Légifrance

export const contextBlocks: ContextBlock[] = [
  // ── HISTORIQUE ───────────────────────────────────────────────────────────
  {
    id: 'ctx-hist-1',
    type: 'historical',
    title: 'Australie (1924) : 100 ans de succès',
    body: "L'Australie a instauré le vote obligatoire aux élections fédérales en 1924, après que la participation était tombée à 59 % en 1922. Résultat immédiat : 91,4 % de participation dès 1925. Depuis un siècle, le taux n'est jamais descendu sous 90 %. Le système a survécu à toutes les alternances politiques et est soutenu par 70 % de la population australienne selon les sondages 2023 (Australian Electoral Commission).",
    source: 'Australian Electoral Commission, rapport 2024',
    year: 1924,
    country: 'Australie',
  },
  {
    id: 'ctx-hist-2',
    type: 'historical',
    title: 'Belgique (1892) : le plus ancien système d\'Europe',
    body: "La Belgique est le premier pays d'Europe à avoir adopté le vote obligatoire, en 1892 — il y a plus de 130 ans. Le système a été conçu pour contrecarrer les effets du suffrage censitaire et donner une voix politique aux classes ouvrières. Aujourd'hui, le taux de participation belge oscille entre 87 % et 93 % selon les élections. Les infractions répétées peuvent mener à une amende de 200 € et, théoriquement, à une radiation des listes électorales (peu appliquée en pratique).",
    source: 'Institut de la démocratie belge, 2023',
    year: 1892,
    country: 'Belgique',
  },
  {
    id: 'ctx-hist-3',
    type: 'historical',
    title: 'Pays-Bas (1917–1970) : l\'expérience abolie',
    body: "Les Pays-Bas ont pratiqué le vote obligatoire de 1917 à 1970, puis l'ont aboli. La participation s'est effondrée de 94 % à 67 % en 10 ans après la suppression. Ce cas est souvent cité par les opposants au vote obligatoire pour montrer que la contrainte ne crée pas de culture civique durable. Les partisans rétorquent que 53 ans d'obligation ont néanmoins forgé des habitudes : la participation hollandaise reste supérieure à la française.",
    source: 'OCDE, rapport comparatif sur la participation électorale, 2022',
    year: 1970,
    country: 'Pays-Bas',
  },

  // ── SCIENTIFIQUE ─────────────────────────────────────────────────────────
  {
    id: 'ctx-sci-1',
    type: 'scientific',
    title: 'Étude : Le vote obligatoire réduit les inégalités de représentation',
    body: 'Une méta-analyse de 47 études (Université de Genève, 2023) conclut que le vote obligatoire réduit de 34 % l\'écart de participation entre classes sociales. Les chercheurs observent que sans obligation, les personnes sans diplôme votent 22 points de moins que les cadres supérieurs. Avec l\'obligation, cet écart tombe à 4 points. L\'effet est maximal lors des premières élections après instauration et se stabilise sur le long terme.',
    source: 'Université de Genève — Journal of Democracy, vol. 34, 2023',
    year: 2023,
  },
  {
    id: 'ctx-sci-2',
    type: 'scientific',
    title: 'Effet "donkey voting" : le risque du vote aléatoire',
    body: 'Une étude de l\'Université nationale d\'Australie (2021) a analysé 30 élections depuis 1950. Elle estime à 3–5 % la proportion de votes "aléatoires" (bulletin plié au hasard, candidat choisi par ordre alphabétique). Cet effet favorise les premiers candidats sur la liste. Les chercheurs nuancent : cet effet est marginal et ne renverse aucun résultat d\'élection, mais il existe et doit être pris en compte dans la conception des bulletins.',
    source: 'Australian National University — Electoral Studies, 2021',
    year: 2021,
  },
  {
    id: 'ctx-sci-3',
    type: 'scientific',
    title: 'INSEE : qui s\'abstient vraiment en France ?',
    body: "Selon l'enquête Participation Électorale de l'INSEE (2024), les abstentionnistes français sont surreprésentés parmi les 18–34 ans (62 % d'abstention), les ouvriers (58 %), les habitants des zones rurales isolées (51 %) et les personnes sans diplôme (61 %). L'étude confirme que l'abstention n'est pas uniformément répartie : elle reflète un sentiment d'exclusion du système politique plus qu'un désintérêt général.",
    source: 'INSEE, Enquête sur la participation électorale, octobre 2024',
    year: 2024,
  },
]

export const scrapedArticles: ScrapedArticle[] = [
  {
    id: 'art-1',
    title: 'La proposition de loi sur le vote obligatoire en commission à l\'Assemblée',
    source: 'Le Monde',
    url: 'https://www.lemonde.fr',
    publishedAt: '2026-03-28T09:00:00.000Z',
    summary: 'La commission des lois a commencé l\'examen de la proposition de loi n°1847 avec 23 amendements déposés.',
    type: 'news',
  },
  {
    id: 'art-2',
    title: 'Vote obligatoire : ce que pensent vraiment les Français',
    source: 'IFOP pour Le Figaro',
    url: 'https://www.lefigaro.fr',
    publishedAt: '2026-03-25T14:30:00.000Z',
    summary: 'Sondage : 52 % des Français se déclarent favorables au vote obligatoire, mais ce chiffre tombe à 38 % quand on précise l\'amende.',
    type: 'news',
  },
]
