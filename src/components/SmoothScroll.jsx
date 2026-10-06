import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reduceMotion.matches) {
      return undefined
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    })

    window.lenis = lenis

    let animationFrame = 0

    const animate = (time) => {
      lenis.raf(time)
      animationFrame = window.requestAnimationFrame(animate)
    }

    animationFrame = window.requestAnimationFrame(animate)

    const alignHashTarget = () => {
      if (!window.location.hash) {
        return
      }

      const target = document.querySelector(window.location.hash)

      if (!target) {
        return
      }

      const headerHeight =
        document.querySelector('.rm-site-header')?.offsetHeight ?? 0
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 18

      lenis.scrollTo(Math.max(targetTop, 0), { immediate: true })
    }

    const hashTimer = window.setTimeout(alignHashTarget, 80)

    return () => {
      window.clearTimeout(hashTimer)
      window.cancelAnimationFrame(animationFrame)
      lenis.destroy()
      if (window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [])

  return null
}

export default SmoothScroll
