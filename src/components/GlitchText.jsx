import { useEffect, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

export default function GlitchText({ text, className = '' }) {
  const ref = useRef(null)
  const intervalRef = useRef(null)

  const scramble = useCallback(() => {
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
      iteration += 0.6
      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
        if (ref.current) ref.current.innerText = text
      }
    }, 35)
  }, [text])

  useEffect(() => {
    const t = setTimeout(scramble, 600)
    return () => {
      clearTimeout(t)
      clearInterval(intervalRef.current)
    }
  }, [scramble])

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={scramble}
    >
      {text}
    </span>
  )
}
