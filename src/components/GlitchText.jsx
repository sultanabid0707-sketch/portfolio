import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

export default function GlitchText({ text, className = '' }) {
  const ref = useRef(null)
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!ref.current) return
      ref.current.innerText = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < iteration) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      iteration += 0.5
      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
        ref.current.innerText = text
      }
    }, 30)
  }

  useEffect(() => {
    // Auto-scramble once on mount
    const t = setTimeout(scramble, 400)
    return () => {
      clearTimeout(t)
      clearInterval(intervalRef.current)
    }
  }, [text])

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={scramble}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {text}
    </span>
  )
}
