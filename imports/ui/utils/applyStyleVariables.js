const toAccentShadow = (colorAccent) => {
  if (colorAccent.startsWith('#') && colorAccent.length === 7) {
    return `${colorAccent}55`
  }

  return colorAccent
}

const LATO_FONT_HREF = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'

const ensureStyleFontLoaded = (style) => {
  if (!style?.fontFamily?.includes('Lato') || typeof document === 'undefined') {
    return
  }

  const existingLink = document.querySelector(`link[href="${LATO_FONT_HREF}"]`)

  if (!existingLink) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = LATO_FONT_HREF
    document.head.appendChild(link)
  }
}

export const getStyleFontLink = (style) => {
  if (!style?.fontFamily?.includes('Lato')) {
    return ''
  }

  return `<link rel="stylesheet" href="${LATO_FONT_HREF}" />`
}

export const getStyleVariableCss = (style) => {
  if (!style) {
    return ''
  }

  const accentShadow = toAccentShadow(style.colorAccent)
  const fontFamily = style.fontFamily || 'CeraPRO, Helvetica, sans-serif'

  return `:root {
  --color-page-background: ${style.backgroundColor};
  --color-footer-background: ${style.backgroundColorFooter};
  --color-accent: ${style.colorAccent};
  --color-harlequin: ${style.colorAccent};
  --color-accent-shadow: ${accentShadow};
  --color-text-mark: ${style.colorMark};
  --color-primary: ${style.colorPrimary};
  --font-family-regular: ${fontFamily};
  --font-family-bold: ${fontFamily};
}`
}

export const applyStyleVariables = (style) => {
  if (!style || typeof document === 'undefined') {
    return
  }

  ensureStyleFontLoaded(style)

  const root = document.documentElement
  const fontFamily = style.fontFamily || 'CeraPRO, Helvetica, sans-serif'

  root.style.setProperty('--color-page-background', style.backgroundColor)
  root.style.setProperty('--color-footer-background', style.backgroundColorFooter)
  root.style.setProperty('--color-accent', style.colorAccent)
  root.style.setProperty('--color-harlequin', style.colorAccent)
  root.style.setProperty('--color-accent-shadow', toAccentShadow(style.colorAccent))
  root.style.setProperty('--color-text-mark', style.colorMark)
  root.style.setProperty('--color-primary', style.colorPrimary)
  root.style.setProperty('--font-family-regular', fontFamily)
  root.style.setProperty('--font-family-bold', fontFamily)
}
