import type { Argument } from '@/types'

export const mockArguments: Argument[] = [
  // ── POUR ─────────────────────────────────────────────────────────────────
  {
    id: 'arg-pour-1',
    referendumId: 'ref-2026-w14',
    side: 'pour',
    body: "En Australie, le vote obligatoire (instauré en 1924) a porté la participation à plus de 90 % depuis un siècle. Les élus y représentent réellement la majorité. Chez nous, un président peut être élu avec 28 % des inscrits. Ce n'est pas une démocratie, c'est une oligarchie de militants.",
    authorPseudonym: 'CivicMax75',
    upvotes: 312,
    createdAt: '2026-03-30T10:14:00.000Z',
    isMock: true,
  },
  {
    id: 'arg-pour-2',
    referendumId: 'ref-2026-w14',
    side: 'pour',
    body: "L'abstention frappe massivement les classes populaires et les jeunes. Ce n'est pas du désintérêt : c'est de la résignation. Rendre le vote obligatoire, c'est une mesure d'égalité sociale qui rééquilibrerait le poids politique des citoyens les moins favorisés face aux retraités et CSP+ qui votent massivement.",
    authorPseudonym: 'Marianne92',
    upvotes: 247,
    createdAt: '2026-03-30T11:32:00.000Z',
    isMock: true,
  },
  {
    id: 'arg-pour-3',
    referendumId: 'ref-2026-w14',
    side: 'pour',
    body: "Le jury populaire est obligatoire. Le service militaire l'était. La démocratie, c'est aussi une responsabilité collective. Si on peut forcer quelqu'un à juger un criminel, on peut lui demander de glisser un bulletin dans une urne une fois tous les cinq ans. 50 € d'amende, c'est moins cher qu'un forfait parking.",
    authorPseudonym: 'LeProfDePhilo',
    upvotes: 198,
    createdAt: '2026-03-30T14:05:00.000Z',
    isMock: true,
  },

  // ── CONTRE ───────────────────────────────────────────────────────────────
  {
    id: 'arg-contre-1',
    referendumId: 'ref-2026-w14',
    side: 'contre',
    body: "La liberté, ça inclut le droit de ne pas choisir. Forcer quelqu'un à voter, c'est transformer un droit fondamental en obligation administrative. Et si on vote blanc par conviction ? Si on n'a confiance en aucun candidat ? Le vrai problème, c'est l'offre politique, pas les citoyens qu'on accuse d'être paresseux.",
    authorPseudonym: 'LibertéDAbord',
    upvotes: 289,
    createdAt: '2026-03-30T09:47:00.000Z',
    isMock: true,
  },
  {
    id: 'arg-contre-2',
    referendumId: 'ref-2026-w14',
    side: 'contre',
    body: "Des millions de votes contraints de citoyens mal informés favoriseront les populistes et les noms 'connus'. Les études sur les pays à vote obligatoire montrent une hausse du vote aléatoire (donkey voting en Australie). On va créer des élus légitimes en apparence mais choisis par des gens qui n'avaient aucune envie de voter.",
    authorPseudonym: 'DataPolitique',
    upvotes: 231,
    createdAt: '2026-03-30T12:18:00.000Z',
    isMock: true,
  },
  {
    id: 'arg-contre-3',
    referendumId: 'ref-2026-w14',
    side: 'contre',
    body: "La vraie question n'est pas COMMENT voter mais POURQUOI ne pas voter. Plutôt que contraindre les citoyens, réformons : proportionnelle intégrale, référendum d'initiative citoyenne, vote internet sécurisé, dimanche obligatoire férié. L'abstention est un signal d'alarme — la punir revient à couper le détecteur de fumée.",
    authorPseudonym: 'RéformeRéelle',
    upvotes: 215,
    createdAt: '2026-03-30T15:50:00.000Z',
    isMock: true,
  },
]
