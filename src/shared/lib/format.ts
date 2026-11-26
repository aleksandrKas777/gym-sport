const ruNumber = new Intl.NumberFormat('ru-RU')

export function formatNumber(value: number): string {
  return ruNumber.format(Math.round(value))
}

/** 80 → «80», 82.5 → «82,5» */
export function formatWeight(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace('.', ',')
}

export function formatTons(kg: number): string {
  return `${(kg / 1000).toFixed(1).replace('.', ',')} т`
}

/** Секунды → «мм:сс» */
export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
