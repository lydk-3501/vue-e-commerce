<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ProductItem from './ProductItem.vue'
import { fetchProducts } from '@/api/api'
import type { Product } from '@/api/api'
export default defineComponent({
    components: {
        ProductItem
    },
    setup() {
        const products = ref<Product[]>([])

        onMounted(async () => {
            try {
                const fetchedProducts = await fetchProducts()
                products.value = fetchedProducts
                console.log(products.value)
            } catch (error) {
                console.error('Failed to fetch products data:', error)
            }
        })

        return {
            products
        }
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
