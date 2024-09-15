<script lang="ts">
import { defineComponent, computed } from 'vue'
import ProductItem from './ProductItem.vue'
import PaginationItems from '../pagination/PaginationItems.vue'
import type { HitsPerPage } from '@/store/productStore'
import { useProductStore } from '@/store/productStore'

export default defineComponent({
    components: {
        ProductItem,
        PaginationItems
    },
    setup() {
        const productStore = useProductStore()

        const products = computed(() => productStore.paginatedProducts)
        const totalPages = computed(() =>
            Math.ceil(productStore.filteredProducts.length / productStore.hitsPerPage)
        )
        const currentPage = computed(() => productStore.currentPage)
        const hitsPerPage = computed(() => productStore.hitsPerPage)

        const setPage = (page: number) => {
            productStore.setCurrentPage(page)
        }

        const setHitsPerPage = (hits: HitsPerPage) => {
            productStore.setHitsPerPage(hits)
        }

        const onHitsPerPageChange = (event: Event) => {
            const target = event.target as HTMLSelectElement
            const value = parseInt(target.value, 10) as HitsPerPage
            setHitsPerPage(value)
        }

        return {
            products,
            totalPages,
            currentPage,
            hitsPerPage,
            setPage,
            onHitsPerPageChange
        }
    }
})
</script>

<template>
    <div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <ProductItem v-for="(product, index) in products" :key="index" v-bind="product" />
        </div>
        <footer className="flex justify-center my-16">
            <PaginationItems
                :currentPage="currentPage"
                :totalPages="totalPages"
                @onPageChange="setPage"
            />
        </footer>
    </div>
</template>
