import axios from 'axios'

export interface Product {
    name: string
    brand: string
    description: string
    categories: string[]
    hierarchicalCategories: {
        lvl0: string[]
        lvl1: string[]
    }
    type: string
    price: number
    price_range: string
    image: string
    url: string
    free_shipping: boolean
    popularity: number
    rating: number
    objectID: string
}

interface FilterParams {
    categories?: string[]
    brand?: string[]
    priceRange?: [number, number]
    rating?: number
    sortBy?: string
    hitsPerPage?: number
    page?: number
    freeShipping?: boolean
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchProducts = async (filters: FilterParams): Promise<Product[]> => {
    try {
        const params = new URLSearchParams()

        if (filters.categories && filters.categories.length > 0) {
            params.append('category', filters.categories.join(','))
        }

        if (filters.brand && filters.brand.length > 0) {
            params.append('brand', filters.brand.join(','))
        }

        if (filters.priceRange) {
            params.append('price_gte', filters.priceRange[0].toString())
            params.append('price_lte', filters.priceRange[1].toString())
        }

        if (filters.sortBy) {
            params.append('sortBy', filters.sortBy)
        }

        if (filters.rating !== undefined) {
            params.append('rating', filters.rating.toString())
        }

        if (filters.freeShipping) {
            params.append('free_shipping', 'true')
        }

        const response = await axios.get<Product[]>(`${apiBaseUrl}/items`, { params })
        return response.data
    } catch (error) {
        console.error('Failed to fetch products:', error)
        throw error
    }
}
