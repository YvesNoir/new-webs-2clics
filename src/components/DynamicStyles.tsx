'use client'

import { useEffect } from 'react'

interface DynamicStylesProps {
  primaryColor: string
  secondaryColor?: string
}

export default function DynamicStyles({ primaryColor, secondaryColor }: DynamicStylesProps) {
  useEffect(() => {
    // Create or update CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--primary-color', primaryColor)
    if (secondaryColor) {
      root.style.setProperty('--secondary-color', secondaryColor)
    }

    // Update existing orange classes with new color
    const styleElement = document.getElementById('dynamic-styles')
    if (styleElement) {
      styleElement.remove()
    }

    const newStyleElement = document.createElement('style')
    newStyleElement.id = 'dynamic-styles'
    newStyleElement.textContent = `
      .bg-orange-500 {
        background-color: ${primaryColor} !important;
      }
      .text-orange-500 {
        color: ${primaryColor} !important;
      }
      .border-orange-500 {
        border-color: ${primaryColor} !important;
      }
      .hover\\:bg-orange-600:hover {
        background-color: ${primaryColor}dd !important;
      }
      .focus\\:ring-orange-500:focus {
        --tw-ring-color: ${primaryColor} !important;
      }
      .focus\\:border-orange-500:focus {
        border-color: ${primaryColor} !important;
      }
    `

    document.head.appendChild(newStyleElement)
  }, [primaryColor, secondaryColor])

  return null
}