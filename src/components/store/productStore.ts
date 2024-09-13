
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchProducts } from '@/api/api'
import type { Product } from '@/api/api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const brandCounts = ref<{ [key: string]: number }>({})
  const brandItems = ref<string[]>([])
  const ratingCounts = ref<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })

  // Filter related state
  const isFreeShipping = ref(false)
  const selectedRating = ref<number | null>(null)
  const selectedBrands = ref<string[]>([])
  const priceMin = ref<number>(1)
  const priceMax = ref<number>(4800)

  // Computed property to get filtered products
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const withinPriceRange = product.price >= priceMin.value && product.price <= priceMax.value
      const matchesRating = selectedRating.value === null || Math.floor(product.rating) === selectedRating.value
      const matchesBrand = selectedBrands.value.length === 0 || selectedBrands.value.includes(product.brand)
      const matchesFreeShipping = !isFreeShipping.value || product.free_shipping

      return withinPriceRange && matchesRating && matchesBrand && matchesFreeShipping
    })
  })

  const fetchProductsAndComputeData = async () => {
    try {
      const productData = await fetchProducts()
      products.value = productData

      // Compute brand counts
      const brandCountMap: { [key: string]: number } = {}
      const brandSet = new Set<string>()

      productData.forEach((product) => {
        const brand = product.brand
        brandSet.add(brand)
        brandCountMap[brand] = (brandCountMap[brand] || 0) + 1
      })

      brandCounts.value = brandCountMap
      brandItems.value = Array.from(brandSet)

      // Compute rating counts
      const ratingCountMap: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }

      productData.forEach((product) => {
        const rating = Math.floor(product.rating)
        if (rating >= 1 && rating <= 5) {
          ratingCountMap[rating] = (ratingCountMap[rating] || 0) + 1
        }
      })

      ratingCounts.value = ratingCountMap
    } catch (error) {
      console.error('Failed to fetch products or compute data:', error)
    }
  }

  // Filter methods
  const addBrand = (brand: string) => {
    if (!selectedBrands.value.includes(brand)) {
      selectedBrands.value.push(brand)
    }
  }
  
  const removeBrand = (brand: string) => {
    selectedBrands.value = selectedBrands.value.filter(item => item !== brand)
  }

  const clearBrands = () => {
    selectedBrands.value = []
  }

  const setPriceRange = (min: number, max: number) => {
    priceMin.value = min
    priceMax.value = max
  }

  const toggleFreeShipping = () => {
    isFreeShipping.value = !isFreeShipping.value
  }

  const setSelectedRating = (rating: number | null) => {
    selectedRating.value = rating
  }

  return {
    products: filteredProducts, 
    brandCounts,
    brandItems,
    ratingCounts,
    fetchProductsAndComputeData,
    isFreeShipping,
    selectedRating,
    selectedBrands,
    priceMin,
    priceMax,
    addBrand,
    removeBrand,
    clearBrands,
    setPriceRange,
    toggleFreeShipping,
    setSelectedRating
  }
})
