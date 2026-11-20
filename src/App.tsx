import { useState } from 'react'
import { ControlDock } from './components/ControlDock'
import { HoloCard } from './components/HoloCard'
import { useCardTilt } from './hooks/useCardTilt'
import type { CardData, CardThemeId, ThemeConfig } from './types/card'

const THEMES: ThemeConfig[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Matte',
    subtitle: 'Noir Satin Finish',
    accentColor: '#e4e4e7',
    swatchGradient: 'linear-gradient(135deg, #52525b, #18181b)',
    bgGradient:
      'linear-gradient(145deg, #18191f 0%, #101115 50%, #09090c 100%)',
    borderStyle: '1px solid rgba(255, 255, 255, 0.12)',
    foilGradient:
      'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.15) 30%, rgba(200, 210, 230, 0.22) 50%, rgba(255, 255, 255, 0.12) 70%, transparent 100%)',
    glareGradient:
      'radial-gradient(circle 300px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)',
    glowColor: 'rgba(255, 255, 255, 0.08)',
    badgeBg: 'rgba(255, 255, 255, 0.06)',
    badgeBorder: 'rgba(255, 255, 255, 0.15)',
    textColor: 'text-zinc-100',
    subtextColor: 'text-zinc-400',
    chipStyle: 'platinum',
  },
  {
    id: 'chrome',
    name: 'Iridescent Chrome',
    subtitle: 'Liquid Spectrum Foil',
    accentColor: '#38bdf8',
    swatchGradient: 'linear-gradient(135deg, #ec4899, #38bdf8)',
    bgGradient:
      'linear-gradient(135deg, #1c202d 0%, #121520 50%, #0d0f17 100%)',
    borderStyle: '1px solid rgba(255, 255, 255, 0.24)',
    foilGradient:
      'linear-gradient(115deg, transparent 0%, rgba(255, 0, 128, 0.45) 20%, rgba(0, 240, 255, 0.45) 40%, rgba(255, 235, 0, 0.4) 60%, rgba(168, 85, 247, 0.45) 80%, transparent 100%)',
    glareGradient:
      'radial-gradient(circle 320px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.8) 0%, rgba(186, 230, 253, 0.3) 35%, transparent 70%)',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'rgba(56, 189, 248, 0.35)',
    textColor: 'text-white',
    subtextColor: 'text-cyan-200/80',
    chipStyle: 'silver',
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    subtitle: 'Bio-Synthetic Jade',
    accentColor: '#10b981',
    swatchGradient: 'linear-gradient(135deg, #34d399, #065f46)',
    bgGradient:
      'linear-gradient(145deg, #071f18 0%, #041410 50%, #020907 100%)',
    borderStyle: '1px solid rgba(52, 211, 153, 0.3)',
    foilGradient:
      'linear-gradient(115deg, transparent 0%, rgba(16, 185, 129, 0.4) 20%, rgba(52, 211, 153, 0.45) 45%, rgba(234, 179, 8, 0.35) 65%, rgba(6, 182, 212, 0.4) 85%, transparent 100%)',
    glareGradient:
      'radial-gradient(circle 300px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(209, 250, 229, 0.7) 0%, rgba(16, 185, 129, 0.25) 35%, transparent 70%)',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeBorder: 'rgba(52, 211, 153, 0.35)',
    textColor: 'text-emerald-50',
    subtextColor: 'text-emerald-300/80',
    chipStyle: 'gold',
  },
]

export function App() {
  const [activeThemeId, setActiveThemeId] = useState<CardThemeId>('chrome')
  const [cardData, setCardData] = useState<CardData>({
    name: 'ALEXANDER CHEN',
    role: 'PRINCIPAL ARCHITECT',
    serialNumber: '#0001 — ARCHETYPE',
    passId: 'MEMBER PASS // 2026',
    status: 'ACTIVE',
  })

  // 3D physics tilt hook - zero re-renders during mouse movement
  const {
    cardRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetAngle,
  } = useCardTilt({ maxAngle: 15 })

  const currentTheme =
    THEMES.find((t) => t.id === activeThemeId) ?? THEMES[0]

  return (
    <main className="w-full h-dvh bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Subtle ambient background glow reflecting active theme */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{
          background: currentTheme.glowColor,
        }}
      />

      {/* Subtle micro-grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Header Label */}
      <header className="absolute top-6 inset-x-0 mx-auto text-center z-10 pointer-events-none">
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500">
          3D HOLOGRAPHIC SPECIMEN // INTERACTIVE TOY
        </p>
      </header>

      {/* Interactive 3D Card Display */}
      <div className="flex items-center justify-center w-full z-20 pb-20 sm:pb-24">
        <HoloCard
          cardRef={cardRef}
          data={cardData}
          theme={currentTheme}
          onNameChange={(name) => setCardData((prev) => ({ ...prev, name }))}
          onRoleChange={(role) => setCardData((prev) => ({ ...prev, role }))}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Minimalist Control Dock */}
      <ControlDock
        data={cardData}
        themes={THEMES}
        activeThemeId={activeThemeId}
        onThemeSelect={setActiveThemeId}
        onNameChange={(name) => setCardData((prev) => ({ ...prev, name }))}
        onRoleChange={(role) => setCardData((prev) => ({ ...prev, role }))}
        onResetAngle={resetAngle}
      />
    </main>
  )
}

export default App
