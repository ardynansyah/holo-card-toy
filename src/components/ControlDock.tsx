import type { CardData, CardThemeId, ThemeConfig } from '../types/card'

interface ControlDockProps {
  data: CardData
  themes: ThemeConfig[]
  activeThemeId: CardThemeId
  onThemeSelect: (id: CardThemeId) => void
  onNameChange: (val: string) => void
  onRoleChange: (val: string) => void
  onResetAngle: () => void
}

export function ControlDock({
  data,
  themes,
  activeThemeId,
  onThemeSelect,
  onNameChange,
  onRoleChange,
  onResetAngle,
}: ControlDockProps) {
  return (
    <footer className="fixed bottom-4 sm:bottom-6 inset-x-0 mx-auto w-full max-w-xl px-4 z-50 pointer-events-auto">
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-4 shadow-2xl shadow-black/90 flex flex-col gap-3">
        {/* Top Row: Quick Inputs for Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="dock-name"
              className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center justify-between"
            >
              <span>Cardholder Name</span>
              <span className="text-[9px] text-zinc-500">Live Edit</span>
            </label>
            <input
              id="dock-name"
              type="text"
              value={data.name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. ALEXANDER CHEN"
              maxLength={26}
              className="w-full bg-zinc-950/70 border border-zinc-700/60 focus:border-zinc-400 rounded-lg px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="dock-role"
              className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center justify-between"
            >
              <span>Role / Title</span>
              <span className="text-[9px] text-zinc-500">Live Edit</span>
            </label>
            <input
              id="dock-role"
              type="text"
              value={data.role}
              onChange={(e) => onRoleChange(e.target.value)}
              placeholder="e.g. PRINCIPAL ARCHITECT"
              maxLength={30}
              className="w-full bg-zinc-950/70 border border-zinc-700/60 focus:border-zinc-400 rounded-lg px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Bottom Row: Theme Presets & Reset Angle */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/80">
          {/* Material Theme Presets */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline mr-1">
              Material:
            </span>
            {themes.map((t) => {
              const isActive = t.id === activeThemeId
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onThemeSelect(t.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                      : 'bg-zinc-950/40 text-zinc-400 border border-transparent hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                  title={`${t.name} — ${t.subtitle}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ background: t.swatchGradient }}
                  />
                  <span className="text-[11px] whitespace-nowrap">{t.name}</span>
                </button>
              )
            })}
          </div>

          {/* Reset Angle Button */}
          <button
            type="button"
            onClick={onResetAngle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 bg-zinc-800/70 hover:bg-zinc-700/80 hover:text-white border border-zinc-700/70 transition-all active:scale-95 shrink-0"
            title="Reset card tilt angle and reflections back to center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset Angle</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
