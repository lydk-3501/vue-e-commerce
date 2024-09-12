import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const isFreeShipping = ref(false)
  const selectedRating = ref<number | null>(null)
  const selectedBrands = ref<string[]>([])
  const priceMin = ref<number>(1)
  const priceMax = ref<number>(4800)


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
    isFreeShipping,
    selectedRating,
    selectedBrands,
    priceMin,
    priceMax,
    toggleFreeShipping,
    setSelectedRating,
    addBrand,
    removeBrand,
    clearBrands,
    setPriceRange
  }
})
