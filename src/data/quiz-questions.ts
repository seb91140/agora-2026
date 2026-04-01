import type { QuizQuestion } from '@/types'

export const quizQuestions: Record<string, QuizQuestion[]> = {
  'ref-2026-w14': [
    {
      id: 'q1-w14',
      referendumId: 'ref-2026-w14',
      question: 'Quel était le taux d\'abstention aux élections législatives françaises de 2024 ?',
      options: ['38,4 %', '47,1 %', '53,2 %', '61,8 %'],
      correctIndex: 2,
      explanation:
        '53,2 % des inscrits ne se sont pas déplacés aux urnes en 2024, un record. Seul 1 Français sur 2 a voté, ce qui questionne la légitimité des élus.',
    },
    {
      id: 'q2-w14',
      referendumId: 'ref-2026-w14',
      question: 'Quel pays européen a instauré le vote obligatoire en premier, et depuis quelle année ?',
      options: [
        'Le Luxembourg, depuis 1919',
        'La Belgique, depuis 1892',
        'La Suisse, depuis 1874',
        'Les Pays-Bas, depuis 1917',
      ],
      correctIndex: 1,
      explanation:
        'La Belgique pratique le vote obligatoire depuis 1892 — soit depuis plus de 130 ans. Son taux de participation dépasse régulièrement 89 %.',
    },
    {
      id: 'q3-w14',
      referendumId: 'ref-2026-w14',
      question: 'Selon la proposition de loi n°1847, quelle sanction est prévue pour un abstentionniste sans motif valable ?',
      options: [
        'Suspension du droit de vote pendant 5 ans',
        'Travaux d\'intérêt général de 20 heures',
        'Amende administrative de 50 €',
        'Privation des aides sociales pendant 1 an',
      ],
      correctIndex: 2,
      explanation:
        'La proposition prévoit une amende de 50 € — comparable à un excès de vitesse léger. Des exemptions sont prévues pour maladie, déplacement professionnel ou force majeure.',
    },
  ],
}
