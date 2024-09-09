import axios from 'axios'

interface Product {
    name: string
    brand: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${apiBaseUrl}/items`)
        return response.data
    } catch (error) {
        console.error('Failed to fetch products:', error)
        throw error
    }
}
