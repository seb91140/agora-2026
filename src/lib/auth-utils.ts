export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'agora2026_salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function generateUserId(): string {
  return 'user_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePseudonym(pseudo: string): string | null {
  if (pseudo.length < 3)  return 'Au moins 3 caractères'
  if (pseudo.length > 20) return 'Maximum 20 caractères'
  if (!/^[a-zA-Z0-9_\-À-ÿ]+$/.test(pseudo)) return 'Lettres, chiffres, _ et - uniquement'
  return null
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Au moins 8 caractères'
  return null
}
