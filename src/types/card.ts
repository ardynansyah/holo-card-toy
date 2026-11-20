export type CardThemeId = 'obsidian' | 'chrome' | 'emerald'

export interface CardData {
  name: string
  role: string
  serialNumber: string
  passId: string
  status: 'ACTIVE' | 'VERIFIED'
}

export interface ThemeConfig {
  id: CardThemeId
  name: string
  subtitle: string
  accentColor: string
  swatchGradient: string
  bgGradient: string
  borderStyle: string
  foilGradient: string
  glareGradient: string
  glowColor: string
  textColor: string
  subtextColor: string
  badgeBg: string
  badgeBorder: string
  chipStyle: 'platinum' | 'silver' | 'gold'
}
