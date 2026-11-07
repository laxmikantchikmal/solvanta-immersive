import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({ children, className = '', delay = 0, y = 34 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.fromTo(el, { autoAlpha: 0, y }, {
      autoAlpha: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [delay, y])
  return <div ref={ref} className={className}>{children}</div>
}
