'use client'

import HeroVariant1 from './hero-variants/HeroVariant1'
import HeroVariant2 from './hero-variants/HeroVariant2'
import HeroVariant3 from './hero-variants/HeroVariant3'
import HeroVariant4 from './hero-variants/HeroVariant4'

interface HeroSectionProps {
  config?: {
    companyName: string
    primaryColor: string
    heroVariant?: string
  }
}

export default function HeroSection({ config }: HeroSectionProps = {}) {
  const heroVariant = config?.heroVariant || 'variant1'

  // Render the selected hero variant
  switch (heroVariant) {
    case 'variant2':
      return <HeroVariant2 config={config} />
    case 'variant3':
      return <HeroVariant3 config={config} />
    case 'variant4':
      return <HeroVariant4 config={config} />
    case 'variant1':
    default:
      return <HeroVariant1 config={config} />
  }
}