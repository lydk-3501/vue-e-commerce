import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { fetchProducts } from '@/api/api'
import type { Product } from '@/api/api'

export type SortCriteria = 'priceAsc' | 'priceDesc' | 'ratingAsc' | 'ratingDesc' | 'feature'
export type HitsPerPage = 16 | 32 | 64
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
    const selectedBrands = ref<string[]>([])
    const priceRange = ref<[number, number]>([0, 4800])
    const selectedRating = ref<number | undefined>(undefined)
    const sortBy = ref<SortCriteria>('feature')
    const isFreeShipping = ref<boolean>(false)
    const hitsPerPage = ref<HitsPerPage>(16)
    const currentPage = ref<number>(1)
    const searchQuery = ref('')
    const categoryCountMap: { [key: string]: number } = {}

    // Fetch products based on the current filters
    const fetchProductsAndComputeData = async () => {
        try {
            const productData = await fetchProducts({
                priceRange: priceRange.value,
                freeShipping: isFreeShipping.value,
                sortBy: sortBy.value
            })

            // Update product list
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

    // Getter to filter products by selected brands
    const filteredProducts = computed(() => {
        let filtered = products.value.filter((product) => {
            const matchesCategories =
                selectedCategories.value.length == 0 ||
                product.categories.join().includes(selectedCategories.value.join())
            const matchesBrand =
                selectedBrands.value.length === 0 || selectedBrands.value.includes(product.brand)
            const matchesRating =
                selectedRating.value === 0 || Math.floor(product.rating) === selectedRating.value
            return matchesBrand && matchesRating && matchesCategories
        })

        // Sort products based on selected sort criteria
        switch (sortBy.value) {
            case 'priceAsc':
                filtered = filtered.sort((a, b) => a.price - b.price)
                break
            case 'priceDesc':
                filtered = filtered.sort((a, b) => b.price - a.price)
                break
            case 'ratingAsc':
                filtered = filtered.sort((a, b) => a.rating - b.rating)
                break
            case 'ratingDesc':
                filtered = filtered.sort((a, b) => b.rating - a.rating)
                break
            case 'feature':
                break
        }

        return filtered
    })

    // Getter to filter and paginate products
    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * hitsPerPage.value
        const end = start + hitsPerPage.value
        return filteredProducts.value.slice(start, end)
    })

    const updateSearchQuery = (query: string) => {
        searchQuery.value = query
    }

    // Automatically fetch data when filters or sorting criteria are changed
    watch(
        [
            selectedCategories,
            selectedBrands,
            priceRange,
            sortBy,
            isFreeShipping,
            selectedRating,
            hitsPerPage,
            currentPage,
            searchQuery
        ],
        () => {
            fetchProductsAndComputeData()
        },
        { deep: true }
    )

    // Add or remove filters and immediately fetch updated data
    const addCategory = (category: string) => {
        if (!selectedCategories.value.includes(category)) {
            selectedCategories.value.push(category)
        }
    }

    const removeCategory = (category: string) => {
        const categoryIndex = selectedCategories.value.indexOf(category)
        if (categoryIndex > -1) {
            selectedCategories.value.splice(categoryIndex, 1)
        }
    }

    const addBrand = (brand: string) => {
        if (!selectedBrands.value.includes(brand)) {
            selectedBrands.value.push(brand)
        }
    }

    const removeBrand = (brand: string) => {
        const brandIndex = selectedBrands.value.indexOf(brand)
        if (brandIndex > -1) {
            selectedBrands.value.splice(brandIndex, 1)
        }
    }

    const updatePriceRange = (minPrice: number, maxPrice: number) => {
        priceRange.value = [minPrice, maxPrice]
    }

    const toggleFreeShipping = () => {
        isFreeShipping.value = !isFreeShipping.value
    }

    const setSelectedRating = (rating: number) => {
        selectedRating.value = rating
    }

    const setSortBy = (criteria: SortCriteria) => {
        sortBy.value = criteria
    }

    const setHitsPerPage = (hits: HitsPerPage) => {
        hitsPerPage.value = hits
        currentPage.value = 1
    }

    const setCurrentPage = (page: number) => {
        currentPage.value = page
    }

    const clearFilters = () => {
        selectedCategories.value = []
        selectedBrands.value = []
        priceRange.value = [0, 4800]
        isFreeShipping.value = false
        selectedRating.value = 0
    }

    return {
        paginatedProducts,
        filteredProducts,
        brandCounts,
        brandItems,
        ratingCounts,
        selectedCategories,
        selectedBrands,
        selectedRating,
        priceRange,
        isFreeShipping,
        sortBy,
        hitsPerPage,
        currentPage,
        categoryCountMap,
        fetchProductsAndComputeData,
        addCategory,
        removeCategory,
        addBrand,
        removeBrand,
        updatePriceRange,
        setSelectedRating,
        setSortBy,
        setHitsPerPage,
        setCurrentPage,
        toggleFreeShipping,
        clearFilters,
        updateSearchQuery
    }
})
