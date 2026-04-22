import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"

import { cn } from "@/lib/utils"

function isOrbMode(props) {
  return props.mode === "orb"
}

export function MagicCard(props) {
  const {
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    mode = "gradient",
  } = props

  const glowFrom = isOrbMode(props) ? (props.glowFrom ?? "#ee4f27") : "#ee4f27"
  const glowTo = isOrbMode(props) ? (props.glowTo ?? "#6b21ef") : "#6b21ef"
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 420) : 420
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.9) : 0.9

  // App is inherently dark mode
  const isDarkTheme = true;

  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 })
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 })
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 })

  const modeRef = useRef(mode)
  const glowOpacityRef = useRef(glowOpacity)
  const gradientSizeRef = useRef(gradientSize)
  const [isPointerActive, setIsPointerActive] = useState(false)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    glowOpacityRef.current = glowOpacity
  }, [glowOpacity])

  useEffect(() => {
    gradientSizeRef.current = gradientSize
  }, [gradientSize])

  const reset = useCallback((reason = "leave") => {
    const currentMode = modeRef.current

    if (currentMode === "orb") {
      if (reason === "enter") orbVisible.set(glowOpacityRef.current)
      else orbVisible.set(0)
      return
    }

    const off = -gradientSizeRef.current
    mouseX.set(off)
    mouseY.set(off)
  }, [mouseX, mouseY, orbVisible])

  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Number.isFinite(e.clientX) ? e.clientX - rect.left : rect.width / 2
    const y = Number.isFinite(e.clientY) ? e.clientY - rect.top : rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handlePointerActivate = useCallback((e) => {
    setIsPointerActive(true)
    handlePointerMove(e)
    reset("enter")
  }, [handlePointerMove, reset])

  const handlePointerDeactivate = useCallback((e) => {
    if (e?.pointerType === "mouse" && e.type === "pointerup") {
      return
    }

    setIsPointerActive(false)
    reset("leave")
  }, [reset])

  useEffect(() => {
    reset("init")
  }, [reset])

  useEffect(() => {
    const handleGlobalPointerOut = (e) => {
      if (!e.relatedTarget) reset("global")
    }
    const handleBlur = () => reset("global")
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global")
    }

    window.addEventListener("pointerout", handleGlobalPointerOut)
    window.addEventListener("blur", handleBlur)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut)
      window.removeEventListener("blur", handleBlur)
      document.removeEventListener("visibilitychange", handleVisibility)
    };
  }, [reset])

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerDeactivate}
      onPointerEnter={handlePointerActivate}
      onPointerDown={handlePointerActivate}
      onPointerUp={handlePointerDeactivate}
      onPointerCancel={handlePointerDeactivate}
      onFocus={handlePointerActivate}
      onBlur={handlePointerDeactivate}
      style={{
        background: useMotionTemplate`
          linear-gradient(var(--color-background) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--color-border) 100%
          ) border-box
        `,
      }}>
      <div className="bg-background absolute inset-px z-20 rounded-[15px]" />
      {mode === "gradient" && (
        <motion.div
          suppressHydrationWarning
          className={cn(
            "pointer-events-none absolute inset-px z-30 rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            isPointerActive && "opacity-100"
          )}
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
            opacity: isPointerActive ? gradientOpacity : undefined,
          }} />
      )}
      {mode === "orb" && (
        <motion.div
          suppressHydrationWarning
          aria-hidden="true"
          className="pointer-events-none absolute z-30"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: orbVisible,
            background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,

            mixBlendMode: isDarkTheme ? "screen" : "multiply",
            willChange: "transform, opacity",
          }} />
      )}
      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
