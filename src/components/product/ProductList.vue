<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import ProductItem from './ProductItem.vue'
import { useProductStore } from '@/components/store/productStore'

export default defineComponent({
    components: {
        ProductItem
    },
    setup() {
        const productStore = useProductStore()
        const products = computed (()=> productStore.products)

        onMounted(async () => {
            try {
                await productStore.fetchProductsAndComputeData()
            } catch (error) {
                console.error('Failed to fetch product data:', error)
            }
        })

        return { products }
    }
})
</script>

<template>
    <div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <ProductItem
                v-for="(product, index) in products"
                :key="index"
                v-bind="product"
                :name="product.name"
                :description="product.description"
                :categories="product.categories"
                :price="product.price"
                :image="product.image"
                :rating="product.rating"
            />
        </div>
    </div>
</template>
