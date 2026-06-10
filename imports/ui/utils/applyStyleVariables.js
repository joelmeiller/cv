const toAccentShadow = (colorAccent) => {
  if (colorAccent.startsWith('#') && colorAccent.length === 7) {
    return `${colorAccent}55`
  }

  return colorAccent
}

export const getStyleVariableCss = (style) => {
  if (!style) {
    return ''
  }

  const accentShadow = toAccentShadow(style.colorAccent)

  return `:root {
  --color-page-background: ${style.backgroundColor};
  --color-accent: ${style.colorAccent};
  --color-harlequin: ${style.colorAccent};
  --color-accent-shadow: ${accentShadow};
  --color-text-mark: ${style.colorMark};
  --color-primary: ${style.colorPrimary};
}`
}

export const applyStyleVariables = (style) => {
  if (!style || typeof document === 'undefined') {
    return
  }

  const root = document.documentElement

  root.style.setProperty('--color-page-background', style.backgroundColor)
  root.style.setProperty('--color-accent', style.colorAccent)
  root.style.setProperty('--color-harlequin', style.colorAccent)
  root.style.setProperty('--color-accent-shadow', toAccentShadow(style.colorAccent))
  root.style.setProperty('--color-text-mark', style.colorMark)
  root.style.setProperty('--color-primary', style.colorPrimary)
}
