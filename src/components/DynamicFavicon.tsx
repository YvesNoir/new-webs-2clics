'use client'

import { useEffect } from 'react'

interface DynamicFaviconProps {
  faviconUrl?: string
}

export default function DynamicFavicon({ faviconUrl }: DynamicFaviconProps) {
  useEffect(() => {
    if (!faviconUrl) return

    // Encontrar el link del favicon existente o crear uno nuevo
    let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement

    if (!faviconLink) {
      faviconLink = document.createElement('link')
      faviconLink.rel = 'icon'
      document.head.appendChild(faviconLink)
    }

    // Actualizar el favicon
    faviconLink.href = faviconUrl

    // También actualizar shortcut icon para compatibilidad
    let shortcutLink = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement

    if (!shortcutLink) {
      shortcutLink = document.createElement('link')
      shortcutLink.rel = 'shortcut icon'
      document.head.appendChild(shortcutLink)
    }

    shortcutLink.href = faviconUrl

  }, [faviconUrl])

  return null // Este componente no renderiza nada visible
}