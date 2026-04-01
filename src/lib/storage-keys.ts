export const STORAGE_KEYS = {
  USER:            'agora_user',
  USERS_REGISTRY:  'agora_users_registry',
  FAKE_USERS:      'agora_fake_users',
  vote:            (weekId: string) => `agora_vote_${weekId}`,
  quiz:            (weekId: string) => `agora_quiz_${weekId}`,
  args:            (weekId: string) => `agora_args_${weekId}`,
  upvotes:         (weekId: string) => `agora_upvotes_${weekId}`,
  fairPlay:        (weekId: string) => `agora_fairplay_${weekId}`,
  SUBMITTED_QS:    'agora_submitted_questions',
} as const
