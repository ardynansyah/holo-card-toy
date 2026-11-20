import { useMemo } from 'react'
import type { CardData, ThemeConfig } from '../types/card'
import { CardChip, ContactlessIcon } from './CardChip'

interface HoloCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>
  data: CardData
  theme: ThemeConfig
  onNameChange: (val: string) => void
  onRoleChange: (val: string) => void
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchEnd: () => void
}

export function HoloCard({
  cardRef,
  data,
  theme,
  onNameChange,
  onRoleChange,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: HoloCardProps) {
  // Calculate uppercase initials for typographic monogram watermark
  const initials = useMemo(() => {
    const parts = data.name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return 'AC'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }, [data.name])

  return (
    <div
      className="relative select-none touch-none"
      style={{
        perspective: '1000px',
      }}
    >
      {/* 3D Tilting Card Container */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="w-[320px] h-[450px] rounded-[24px] relative cursor-grab active:cursor-grabbing transform-gpu"
        style={
          {
            // Set 3D transform driven by CSS Variables
            transform:
              'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
            transformStyle: 'preserve-3d',
            boxShadow:
              'var(--shadow-x, 0px) var(--shadow-y, 20px) 45px -10px rgba(0, 0, 0, 0.8), 0 0 35px var(--glow-color, rgba(0,0,0,0.5))',
            '--glow-color': theme.glowColor,
          } as React.CSSProperties
        }
      >
        {/* ============================================================ */}
        {/* BASE & HOLOGRAPHIC FOIL SURFACE (CLIPPED TO ROUNDED CORNERS) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none"
          style={{
            border: theme.borderStyle,
            background: theme.bgGradient,
          }}
        >
          {/* Subtle noise/brushed anisotropic metallic texture */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />

          {/* Rainbow Spectral Holographic Interference Layer */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: theme.foilGradient,
              backgroundPosition:
                'calc(var(--glare-x, 50%) * 1.8) calc(var(--glare-y, 50%) * 1.8)',
              backgroundSize: '220% 220%',
              mixBlendMode: 'color-dodge',
              opacity: 'calc(var(--glare-opacity, 0) * 0.85)',
            }}
          />

          {/* Specular Radial Glare Highlight Layer */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: theme.glareGradient,
              mixBlendMode: 'overlay',
              opacity: 'var(--glare-opacity, 0)',
            }}
          />

          {/* Subtle diagonal glossy sheen line */}
          <div
            className="absolute -inset-[100%] transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.12) 50%, transparent 60%)',
              transform:
                'translate(calc(var(--glare-x, 50%) * 0.5), calc(var(--glare-y, 50%) * 0.5))',
              mixBlendMode: 'plus-lighter',
              opacity: 'calc(var(--glare-opacity, 0) * 0.7)',
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* 3D PARALLAX CONTENT LAYER (PRESERVE-3D DEPTH)                */}
        {/* ============================================================ */}
        <div
          className="relative w-full h-full flex flex-col justify-between p-6 pointer-events-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ----------------- TOP BAR: BADGE & CHIP ----------------- */}
          <div
            className="flex items-center justify-between"
            style={{
              transform: 'translateZ(30px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Monospace Badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-sm"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.badgeBorder,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: theme.accentColor }}
              />
              <span className="text-[10px] font-mono tracking-widest text-zinc-200 font-semibold uppercase">
                {data.passId}
              </span>
            </div>

            {/* Chip & Contactless Geometric Cluster */}
            <div className="flex items-center gap-2">
              <ContactlessIcon className="w-5 h-5 text-white/40" />
              <CardChip style={theme.chipStyle} />
            </div>
          </div>

          {/* ----------------- MIDDLE: NAME & ROLE (INLINE EDITABLE) ----------------- */}
          <div
            className="my-auto relative flex flex-col justify-center py-2"
            style={{
              transform: 'translateZ(38px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Giant Monogram Watermark Floating Deep Inside */}
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 text-[110px] font-black tracking-tighter select-none pointer-events-none opacity-[0.06] font-mono leading-none"
              style={{
                transform: 'translateZ(-15px)',
                color: theme.accentColor,
              }}
            >
              {initials}
            </div>

            {/* Category Subtitle */}
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-zinc-400/80">
                AUTHORIZED HOLDER
              </span>
              <span
                className="text-[8px] font-mono px-1 rounded"
                style={{
                  color: theme.accentColor,
                  backgroundColor: theme.badgeBg,
                }}
              >
                // VIP
              </span>
            </div>

            {/* Inline Editable Name */}
            <div className="group relative">
              <input
                type="text"
                value={data.name}
                onChange={(e) => onNameChange(e.target.value)}
                maxLength={26}
                aria-label="Cardholder Name"
                className={`w-full bg-transparent text-2xl font-bold tracking-tight uppercase leading-tight ${theme.textColor} placeholder-zinc-500 border-b border-transparent hover:border-white/20 focus:border-white/50 focus:outline-none transition-colors py-0.5`}
                placeholder="YOUR NAME"
                title="Click to edit name directly on card"
              />
            </div>

            {/* Inline Editable Role */}
            <div className="group relative mt-1">
              <input
                type="text"
                value={data.role}
                onChange={(e) => onRoleChange(e.target.value)}
                maxLength={30}
                aria-label="Cardholder Role"
                className={`w-full bg-transparent text-xs font-mono font-medium tracking-wider uppercase ${theme.subtextColor} placeholder-zinc-600 border-b border-transparent hover:border-white/20 focus:border-white/50 focus:outline-none transition-colors py-0.5`}
                placeholder="YOUR ROLE"
                title="Click to edit role directly on card"
              />
            </div>
          </div>

          {/* ----------------- BOTTOM BAR: SERIAL & STATUS ----------------- */}
          <div
            className="pt-4 border-t border-white/10 flex items-end justify-between"
            style={{
              transform: 'translateZ(26px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Monospace Serial Number */}
            <div className="flex flex-col">
              <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-zinc-500 mb-0.5">
                SERIAL MATRIX
              </span>
              <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-300">
                {data.serialNumber}
              </span>
            </div>

            {/* Active Status Beacon */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </span>
              <span
                className="text-[10px] font-mono font-bold tracking-widest uppercase"
                style={{ color: theme.accentColor }}
              >
                {data.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
