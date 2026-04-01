import React from 'react'

export function PageContainer({
  children,
  className = '',
  narrow = false,
}: {
  children: React.ReactNode
  className?: string
  narrow?: boolean
}) {
  return (
    <main className={`max-w-${narrow ? '3xl' : '6xl'} mx-auto px-4 sm:px-6 py-8 ${className}`}>
      {children}
    </main>
  )
}
