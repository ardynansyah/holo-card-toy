import { useCallback, useEffect, useRef } from 'react'

export interface CardTiltOptions {
  maxAngle?: number
}

export function useCardTilt({ maxAngle = 15 }: CardTiltOptions = {}) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  // Smoothly reset angle and glare with spring ease-out transition
  const resetAngle = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    // Re-enable smooth transition for reset animation
    card.style.transition =
      'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out'
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    card.style.setProperty('--glare-opacity', '0')
    card.style.setProperty('--glare-x', '50%')
    card.style.setProperty('--glare-y', '50%')
    card.style.setProperty('--shadow-x', '0px')
    card.style.setProperty('--shadow-y', '20px')
  }, [])

  // Update tilt physics and CSS variables directly on DOM element (0 re-renders)
  const updateTilt = useCallback(
    (clientX: number, clientY: number) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      // Center of the card
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Relative coordinates normalized to [-1, 1]
      const rawX = (clientX - centerX) / (rect.width / 2)
      const rawY = (clientY - centerY) / (rect.height / 2)

      // Clamp strictly within [-1, 1]
      const clampedX = Math.max(-1, Math.min(1, rawX))
      const clampedY = Math.max(-1, Math.min(1, rawY))

      // Rotation angles (-15deg to 15deg)
      // Tilting top backward when cursor is at top, elevating active edge
      const rotateX = -clampedY * maxAngle
      const rotateY = clampedX * maxAngle

      // Glare coordinates in percentages
      const glareX = ((clientX - rect.left) / rect.width) * 100
      const glareY = ((clientY - rect.top) / rect.height) * 100

      // Dynamic reactive shadow offsetting opposite to tilt
      const shadowX = -clampedX * 24
      const shadowY = 20 - clampedY * 16

      // Disable transition while moving for instant 60fps tracking
      card.style.transition = 'none'

      // Set CSS variables directly
      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`)
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`)
      card.style.setProperty('--glare-x', `${glareX.toFixed(2)}%`)
      card.style.setProperty('--glare-y', `${glareY.toFixed(2)}%`)
      card.style.setProperty('--glare-opacity', '1')
      card.style.setProperty('--shadow-x', `${shadowX.toFixed(2)}px`)
      card.style.setProperty('--shadow-y', `${shadowY.toFixed(2)}px`)
    },
    [maxAngle],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateTilt(e.clientX, e.clientY)
    },
    [updateTilt],
  )

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current
    if (card) {
      card.style.transition = 'none'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    resetAngle()
  }, [resetAngle])

  const handleTouchStart = useCallback(() => {
    const card = cardRef.current
    if (card) {
      card.style.transition = 'none'
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        updateTilt(touch.clientX, touch.clientY)
      }
    },
    [updateTilt],
  )

  const handleTouchEnd = useCallback(() => {
    resetAngle()
  }, [resetAngle])

  // Initialize CSS variables on mount
  useEffect(() => {
    resetAngle()
  }, [resetAngle])

  return {
    cardRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetAngle,
  }
}
