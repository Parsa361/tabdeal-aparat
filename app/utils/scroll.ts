export function smoothScrollToY(targetY: number, duration = 500) {
  if (!import.meta.client) return

  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeInOutCubic(progress)

    window.scrollTo(0, startY + distance * easedProgress)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export function smoothScrollToElement(
  element: HTMLElement,
  options?: {
    duration?: number
    offset?: number
  },
) {
  if (!import.meta.client) return

  const duration = options?.duration ?? 500
  const offset = options?.offset ?? 0

  const rect = element.getBoundingClientRect()
  const targetY = window.scrollY + rect.top - offset

  smoothScrollToY(targetY, duration)
}
