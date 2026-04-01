import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  maxLength?: number
  currentLength?: number
}

export function Textarea({ label, error, maxLength, currentLength, className = '', id, ...props }: TextareaProps) {
  const areaId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={areaId} className="text-sm font-medium text-gray-700">{label}</label>
          {maxLength !== undefined && (
            <span className={`text-xs ${(currentLength ?? 0) > maxLength * 0.9 ? 'text-orange-500' : 'text-gray-400'}`}>
              {currentLength ?? 0}/{maxLength}
            </span>
          )}
        </div>
      )}
      <textarea
        id={areaId}
        className={[
          'w-full rounded-lg border px-4 py-3 text-sm transition-colors resize-none',
          'focus:outline-none focus:ring-2 focus:ring-bleu-republic focus:border-transparent',
          error
            ? 'border-red-400 bg-red-50 text-red-900 placeholder-red-400'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-400',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
