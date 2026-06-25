import { useRef, useCallback } from 'react'

export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transition = 'transform 0.12s linear'
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
