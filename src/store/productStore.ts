import { defineStore } from 'pinia'
import { ref } from 'vue'
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
  const selectedCategories = ref<string[]>([])

  const fetchProductsAndComputeData = async () => {
    try {
      const productData = await fetchProducts()
      products.value = productData

      const brandCountMap: { [key: string]: number } = {}
      const brandSet = new Set<string>()

      productData.forEach((product) => {
        const brand = product.brand
        brandSet.add(brand)
        brandCountMap[brand] = (brandCountMap[brand] || 0) + 1
      })

      brandCounts.value = brandCountMap
      brandItems.value = Array.from(brandSet)

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

  const addCategory = (category: string) => {
    if (!selectedCategories.value.includes(category)) {
      selectedCategories.value.push(category)
    }
  }

  const removeCategory = (category: string) => {
    // Remove the category and any children from the selected categories list
    const categoryIndex = selectedCategories.value.indexOf(category)
    if (categoryIndex > -1) {
        selectedCategories.value.splice(categoryIndex, 1)
    }
}

  const clearCategories = () => {
    selectedCategories.value = []
  }

  return {
    products,
    brandCounts,
    brandItems,
    ratingCounts,
    selectedCategories,
    fetchProductsAndComputeData,
    addCategory,
    removeCategory,
    clearCategories
  }
})
