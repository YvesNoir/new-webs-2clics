// API para obtener propiedades del servicio externo

export interface PropertyFilters {
  amount_bedroom?: string[]
  operation_type?: string[]
  property_type?: string[]
  min_price?: string
  max_price?: string
  currency?: 'U$D' | 'AR$'
  amount_room?: string[]
}

export interface PropertySearchParams {
  offset: number
  limit: number
  filters?: PropertyFilters
}

export interface Property {
  propertyId: string
  address: string
  price: string
  currency: string
  operationType: string
  amountRoom: number
  amountBedroom: number
  coveredArea: string
  uncoveredArea: string
  semiCoveredArea?: string
  totalArea: string
  lat: number
  long: number
  publishDate?: string
  modifiedDate?: string
  folder?: string
  number?: string
  hidePrice?: boolean
  url?: string
  neighborhood: {
    neighborhoodId: number
    name: string
    mlId?: string
    zpId?: string
    apCity?: string
    apNeighborhood?: string
  }
  city: {
    cityId: number
    name: string
    mlId?: string
    zpId?: string
    apCity?: string
    apBigCity?: string
  }
  state: {
    stateId: number
    name: string
  }
  propertyType: {
    typeId: string
    name: string
    appId?: number
    group?: string
  }
  images: Array<{
    imageId: string
    url: string
    name: string
    thumbnailUrl: string
    thumbnailName: string
    virtualizedUrl?: string
    useVirtualized?: boolean
    thumbnailVirtualizedUrl?: string
  }>
  meta_data: Array<{
    metaId: string
    propertyId: string
    metaKey: string
    metaValue: string
  }>
  amenities?: Array<{
    amenitieId: string
    name: string
    appId?: string
    mlId?: string
    zpId?: string
    apId?: string
    reporteId?: string
    goplaceitId?: string
    type: string
  }>
  realEstate?: {
    realEstateId: number
    name: string
    phoneOne: string
    phoneTwo: string
    email: string
    address: string
    web: string
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    urlImg?: string
    creationDate?: string
    state: {
      stateId: number
      name: string
    }
    city: {
      cityId: number
      name: string
    }
    neighborhood: {
      neighborhoodId: string
    }
    image?: {
      imageId: string
      url: string
      name: string
      thumbnailUrl: string
      thumbnailName: string
    }
  }
  agent?: {
    userId: string
    email: string
    fullName: string
    role: string
    cellphone: string
    lastLogin?: string
    firebaseId?: string
    status?: string
    realEstate?: any // Nested realEstate info
  }
  status?: string
}

export interface PropertyResponse {
  data: Property[]
  total: number
  offset: number
  limit: number
}

const API_URL = 'https://api.2clics.com.ar/api/external/properties'
const API_KEY = 'kyw-ucv3ebh@dnp*JQVfed4ktw*yan!rqm'

export async function fetchProperties(params: PropertySearchParams): Promise<PropertyResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      console.error('Error fetching properties:', response.status, response.statusText)
      return {
        data: [],
        total: 0,
        offset: params.offset || 0,
        limit: params.limit || 10
      }
    }

    const data = await response.json()

    // La API devuelve: { status: "success", count: X, properties: [...] }
    return {
      data: data.properties || data.data || data || [],
      total: data.count || data.total || (data.properties ? data.properties.length : (data.data ? data.data.length : (Array.isArray(data) ? data.length : 0))),
      offset: data.offset || params.offset || 0,
      limit: data.limit || params.limit || 10
    }
  } catch (error) {
    console.error('Error fetching properties:', error)
    return {
      data: [],
      total: 0,
      offset: params.offset || 0,
      limit: params.limit || 10
    }
  }
}

// Constantes para los filtros
export const PROPERTY_TYPES = {
  '5781': 'Casa quinta',
  '5785': 'Departamento',
  '5791': 'Casa',
  '5794': 'Terreno / Lote',
  '5786': 'Galpón',
  '5780': 'Local comercial',
  '5790': 'Oficina',
  '5784': 'Cochera',
  '5793': 'Chalet',
  '5787': 'Depósito',
  '5795': 'Dúplex',
  '5796': 'Campo',
  '5797': 'Fondo de comercio',
  '5798': 'Hotel',
  '5799': 'Finca',
  '5803': 'Edificio',
  '5805': 'Cabaña',
  '5806': 'Chacra',
  '5792': 'PH'
}

export const OPERATION_TYPES = {
  'VENTA': 'Venta',
  'ALQUILER_PERMANENTE': 'Alquiler',
  'ALQUILER_TEMPORARIO': 'Alquiler Temporal'
}

export const BEDROOMS_OPTIONS = ['1', '2', '3', '4', '5']
export const ROOMS_OPTIONS = ['1', '2', '3', '4', '5']
export const CURRENCY_OPTIONS = ['U$D', 'AR$']