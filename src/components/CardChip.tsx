interface CardChipProps {
  style?: 'platinum' | 'silver' | 'gold'
  className?: string
}

export function CardChip({ style = 'silver', className = '' }: CardChipProps) {
  // Color palette for the chip circuitry based on theme
  const palettes = {
    platinum: {
      base: 'from-zinc-300 via-zinc-400 to-zinc-500',
      border: 'border-zinc-400/40',
      line: '#71717a',
      padBg: 'rgba(255, 255, 255, 0.15)',
      specular: 'rgba(255, 255, 255, 0.4)',
    },
    silver: {
      base: 'from-slate-100 via-zinc-300 to-slate-400',
      border: 'border-white/60',
      line: '#64748b',
      padBg: 'rgba(255, 255, 255, 0.25)',
      specular: 'rgba(255, 255, 255, 0.6)',
    },
    gold: {
      base: 'from-amber-200 via-amber-400 to-yellow-600',
      border: 'border-amber-300/60',
      line: '#92400e',
      padBg: 'rgba(251, 191, 36, 0.2)',
      specular: 'rgba(254, 240, 138, 0.5)',
    },
  }

  const current = palettes[style]

  return (
    <div
      className={`relative w-11 h-8.5 rounded-md overflow-hidden bg-gradient-to-br ${current.base} p-[1px] shadow-sm select-none ${className}`}
      aria-label="Security Chip"
    >
      {/* Metallic microchip surface */}
      <div className="w-full h-full rounded-[5px] relative flex items-center justify-center overflow-hidden">
        {/* Subtle metallic sheen lines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.25)_50%,transparent_75%)] bg-[length:250%_250%]" />

        {/* EMV Micro-Etch SVG Circuit */}
        <svg
          viewBox="0 0 44 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* Outer track */}
          <rect
            x="2"
            y="2"
            width="40"
            height="30"
            rx="3"
            stroke={current.line}
            strokeWidth="0.8"
            strokeOpacity="0.75"
          />

          {/* Central contact pad */}
          <rect
            x="16"
            y="9"
            width="12"
            height="16"
            rx="2"
            fill={current.padBg}
            stroke={current.line}
            strokeWidth="0.8"
            strokeOpacity="0.8"
          />

          {/* Intersecting horizontal trace */}
          <line
            x1="2"
            y1="17"
            x2="16"
            y2="17"
            stroke={current.line}
            strokeWidth="0.8"
            strokeOpacity="0.75"
          />
          <line
            x1="28"
            y1="17"
            x2="42"
            y2="17"
            stroke={current.line}
            strokeWidth="0.8"
            strokeOpacity="0.75"
          />

          {/* Diagonal connecting isolation notches */}
          <path
            d="M 10 2 L 16 11 M 34 2 L 28 11 M 10 32 L 16 23 M 34 32 L 28 23"
            stroke={current.line}
            strokeWidth="0.75"
            strokeOpacity="0.7"
          />

          {/* Inner core circuit icon */}
          <circle
            cx="22"
            cy="17"
            r="2"
            fill={current.specular}
            stroke={current.line}
            strokeWidth="0.6"
          />
        </svg>
      </div>
    </div>
  )
}

export function ContactlessIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      aria-label="Contactless"
    >
      <path d="M7.5 4.21a12 12 0 0 1 0 15.58" opacity="0.4" />
      <path d="M10.5 7.21a8 8 0 0 1 0 9.58" opacity="0.7" />
      <path d="M13.5 10.21a4 4 0 0 1 0 3.58" />
    </svg>
  )
}
