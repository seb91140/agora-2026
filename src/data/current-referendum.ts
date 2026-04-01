import type { ReferendumQuestion } from '@/types'

export const currentReferendum: ReferendumQuestion = {
  id: 'ref-2026-w14',
  weekId: '2026-W14',
  title: 'Faut-il instaurer le vote obligatoire en France ?',
  summary:
    'Une proposition de loi constitutionnelle vise à rendre le vote obligatoire pour toutes les élections nationales, avec une amende de 50 € en cas d\'abstention injustifiée. Objectif : lutter contre la crise de représentativité et la montée de l\'abstention qui dépasse 53% aux législatives.',
  fullText: `La proposition de loi constitutionnelle n°1847, déposée le 12 février 2026 par 89 députés de différents groupes politiques, prévoit de rendre la participation aux élections présidentielles et législatives obligatoire pour tout citoyen français inscrit sur les listes électorales.

**Dispositions principales :**
- Obligation de vote pour les citoyens de 18 ans et plus
- Amende administrative de 50 € en cas d'abstention non justifiée
- Motifs d'exemption reconnus : maladie, déplacement professionnel, force majeure
- Le vote blanc est reconnu et comptabilisé séparément
- Entrée en vigueur progressive : présidentielle 2032 et législatives 2033

**Contexte :**
Aux dernières élections législatives de 2024, le taux d'abstention a atteint 53,2%, un record historique. Seuls 47% des Français inscrits ont exprimé un vote. Cette situation crée une crise de légitimité pour les élus, qui représentent parfois moins d'un quart des électeurs potentiels.

**Comparaisons internationales :**
Vingt-sept pays dans le monde pratiquent le vote obligatoire, dont la Belgique (depuis 1892), l'Australie (depuis 1924) et le Luxembourg. Ces pays affichent des taux de participation supérieurs à 90%.`,
  category: 'democratie',
  publishedAt: '2026-03-30T08:00:00.000Z',
  expiresAt: '2026-04-06T20:00:00.000Z',
  source: "Assemblée Nationale — Proposition de loi n°1847",
  sourceUrl: 'https://www.assemblee-nationale.fr',
  totalVotes: 47832,
  pourPercent: 54,
}
