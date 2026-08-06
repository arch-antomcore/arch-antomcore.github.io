import * as React from "react"
import { cn } from "@/lib/utils"

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}) {
  const text1Ref = React.useRef(null)
  const text2Ref = React.useRef(null)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let animationFrameId

    const setMorph = (fraction) => {
      const el1 = text1Ref.current
      const el2 = text2Ref.current
      if (!el1 || !el2) return

      el2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      el2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      fraction = 1 - fraction
      el1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      el1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
    }

    const doCooldown = () => {
      morph = 0
      const el1 = text1Ref.current
      const el2 = text2Ref.current
      const container = containerRef.current
      if (!el1 || !el2) return

      el2.style.filter = ""
      el2.style.opacity = "100%"
      el1.style.filter = ""
      el1.style.opacity = "0%"
      if (container) {
        container.style.filter = "none"
      }
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime

      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }

      const container = containerRef.current
      if (container) {
        container.style.filter = "url(#gooey-filter)"
      }

      setMorph(fraction)
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime

      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          const el1 = text1Ref.current
          const el2 = text2Ref.current
          if (el1 && el2) {
            el1.textContent = texts[textIndex % texts.length] ?? ""
            el2.textContent = texts[(textIndex + 1) % texts.length] ?? ""
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    // Set initial text on refs on mount
    const el1 = text1Ref.current
    const el2 = text2Ref.current
    if (el1 && el2) {
      el1.textContent = texts[textIndex % texts.length] ?? ""
      el2.textContent = texts[(textIndex + 1) % texts.length] ?? ""
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [texts, morphTime, cooldownTime])

  return (
    <div className={cn("relative h-[1.3em] w-full overflow-visible", className)}>
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-filter">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feGaussianBlur in="gooey" stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ filter: "none" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center w-full",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center w-full",
            textClassName
          )}
        />
      </div>
    </div>
  )
}
