import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'pour' | 'contre'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-bleu-republic text-white hover:bg-bleu-republic-600 shadow-sm',
  secondary: 'bg-white text-bleu-republic border border-bleu-republic hover:bg-blue-50',
  ghost:     'bg-transparent text-gray-600 hover:bg-gray-100',
  danger:    'bg-rouge-marianne text-white hover:bg-rouge-marianne-hover shadow-sm',
  pour:      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
  contre:    'bg-rouge-marianne text-white hover:bg-rouge-marianne-hover shadow-sm',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bleu-republic',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
