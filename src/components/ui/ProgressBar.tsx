'use client'
import { useEffect, useState } from 'react'

interface ProgressBarProps {
  value: number          // 0–100
  color?: string
  label?: string
  animated?: boolean
  height?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

export function ProgressBar({ value, color = 'bg-bleu-republic', label, animated = true, height = 'md' }: ProgressBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min(100, Math.max(0, value))), 50)
    return () => clearTimeout(t)
  }, [value])

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">{label}</span>
          <span className="text-xs font-bold text-gray-800">{value}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[height]}`}>
        <div
          className={`${heights[height]} ${color} rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
