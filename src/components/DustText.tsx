import { useMemo } from 'react'

interface DustTextProps {
  text: string
  className?: string
  delay?: number // overall start delay in ms
  spread?: number // max px offset for scatter
}

export default function DustText({ text, className = '', delay = 0, spread = 60 }: DustTextProps) {
  // Generate stable random offsets per character (memo so they don't re-randomize on re-render)
  const chars = useMemo(() => {
    return text.split('').map((char, i) => {
      // Wind blows mostly from left, so lean dx toward negative
      const dx = (Math.random() - 0.65) * spread * 2
      const dy = (Math.random() - 0.5) * spread * 0.5
      const blur = 4 + Math.random() * 8
      const charDelay = delay + i * 45
      return { char, dx, dy, blur, charDelay }
    })
  }, [text, delay, spread])

  return (
    <span className={`dust-text ${className}`} aria-label={text}>
      {chars.map(({ char, dx, dy, blur, charDelay }, i) => (
        <span
          key={i}
          className="dust-char"
          style={{
            '--dx': `${dx}px`,
            '--dy': `${dy}px`,
            '--blur': `${blur}px`,
            animationDelay: `${charDelay}ms`,
          } as React.CSSProperties}
        >
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </span>
  )
}
