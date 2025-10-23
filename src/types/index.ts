export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  featured: boolean
  status: 'available' | 'sold' | 'rented'
  type: 'sale' | 'rent'
  agentId: string
  createdAt: Date
  updatedAt: Date
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  bio?: string
  properties: Property[]
  createdAt: Date
  updatedAt: Date
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  status: 'new' | 'replied' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export interface SiteConfig {
  id: string
  companyName: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  phone: string
  email: string
  address: string
  description: string
  selectedBlocks: BlockConfig[]
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

export interface BlockConfig {
  id: string
  type: 'hero' | 'featured-properties' | 'search' | 'company-info'
  position: number
  visible: boolean
  config: Record<string, any>
}