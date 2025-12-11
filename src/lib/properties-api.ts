// API para obtener propiedades del servicio externo

export interface PropertyFilters {
  amount_bedroom?: string[]
  operation_type?: string[]
  property_type?: string[]
  min_price?: string
  max_price?: string
  currency?: 'U$D' | 'AR$'
  amount_room?: string[]
  location?: string
  neighborhood_id?: string[]
  city_id?: string[]
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
    // Clean params to remove location-specific IDs that API might not support
    const cleanParams = { ...params }
    if (cleanParams.filters) {
      const cleanFilters = { ...cleanParams.filters }
      // Remove neighborhood_id and city_id as API might not support them
      // We'll filter client-side instead
      delete cleanFilters.neighborhood_id
      delete cleanFilters.city_id
      cleanParams.filters = cleanFilters
    }

    // Debug: log what we're sending to the API
    console.log('Sending to API:', JSON.stringify(cleanParams, null, 2))

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY
      },
      body: JSON.stringify(cleanParams)
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

    // Debug: log what we get from the API
    console.log('API Response:', {
      status: response.status,
      dataKeys: Object.keys(data),
      count: data.count || data.total,
      propertiesLength: (data.properties || data.data || data || []).length
    })

    let properties = data.properties || data.data || data || []

    // Always filter client-side by location name since API might not support location filters properly
    if (params.filters?.location) {
      const locationName = params.filters.location.toLowerCase()
      properties = properties.filter((property: Property) => {
        const neighborhoodMatch = property.neighborhood?.name?.toLowerCase().includes(locationName)
        const cityMatch = property.city?.name?.toLowerCase().includes(locationName)
        return neighborhoodMatch || cityMatch
      })
      console.log(`Client-side filtered ${properties.length} properties for location: ${params.filters.location}`)
    }

    // La API devuelve: { status: "success", count: X, properties: [...] }
    // Use filtered properties length as total when client-side filtering was applied
    const total = params.filters?.location ? properties.length : (data.count || data.total || properties.length)

    return {
      data: properties,
      total: total,
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

// Interface for location suggestions
export interface LocationSuggestion {
  id: string
  name: string
  type: 'neighborhood' | 'city'
}

// Cache for all locations
let locationsCache: LocationSuggestion[] | null = null

// Function to get all locations (neighborhoods and cities) - only fetches once
export async function getAllLocations(): Promise<LocationSuggestion[]> {
  if (locationsCache) return locationsCache

  try {
    // Fetch all properties to extract unique locations
    const response = await fetchProperties({
      offset: 0,
      limit: 500, // Get more properties to capture more locations
      filters: {}
    })

    const locations: LocationSuggestion[] = []
    const uniqueLocations = new Set<string>()

    // Extract neighborhoods and cities from properties
    response.data.forEach(property => {
      // Add neighborhood
      if (property.neighborhood?.name &&
          !uniqueLocations.has(`neighborhood:${property.neighborhood.name}`)) {
        locations.push({
          id: `neighborhood:${property.neighborhood.neighborhoodId}`,
          name: property.neighborhood.name,
          type: 'neighborhood'
        })
        uniqueLocations.add(`neighborhood:${property.neighborhood.name}`)
      }

      // Add city
      if (property.city?.name &&
          !uniqueLocations.has(`city:${property.city.name}`)) {
        locations.push({
          id: `city:${property.city.cityId}`,
          name: property.city.name,
          type: 'city'
        })
        uniqueLocations.add(`city:${property.city.name}`)
      }
    })

    // Cache the results
    locationsCache = locations.sort((a, b) => a.name.localeCompare(b.name))
    return locationsCache
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}

// Function to search for locations locally (no API calls)
export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  if (!query || query.length < 2) return []

  const allLocations = await getAllLocations()

  console.log(`🔍 Searching for "${query}" in ${allLocations.length} locations`)

  // Normalize query for better matching
  const normalizedQuery = query.toLowerCase().trim()

  const filteredLocations = allLocations.filter(location => {
    const normalizedName = location.name.toLowerCase()

    // Multiple search strategies:
    // 1. Full name contains query
    const fullMatch = normalizedName.includes(normalizedQuery)

    // 2. Each word in query matches any word in location name
    const queryWords = normalizedQuery.split(' ').filter(word => word.length > 0)
    const locationWords = normalizedName.split(' ').filter(word => word.length > 0)

    const wordMatch = queryWords.every(queryWord =>
      locationWords.some(locationWord => locationWord.includes(queryWord))
    )

    return fullMatch || wordMatch
  })

  console.log(`📍 Found ${filteredLocations.length} matches for "${query}":`, filteredLocations.map(l => l.name))

  // Sort by relevance (exact matches first, then partial matches)
  return filteredLocations
    .sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(normalizedQuery)
      const bExact = b.name.toLowerCase().startsWith(normalizedQuery)

      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      return a.name.localeCompare(b.name)
    })
    .slice(0, 10) // Limit to 10 suggestions
}