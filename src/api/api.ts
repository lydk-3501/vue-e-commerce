import axios from 'axios'

export interface Product {
    name: string
    brand: string;
    description: string;
    categories: string[];
    hierarchicalCategories: {
        lvl0: string[];
        lvl1: string[];
    };
    type: string;
    price: number;
    price_range: string;
    image: string;
    url: string;
    free_shipping: boolean;
    popularity: number;
    rating: number;
    objectID: string;
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
