<script lang="ts">
import { defineComponent, computed } from 'vue'
import ProductItem from './ProductItem.vue'
import { useProductStore } from '@/store/productStore'

export default defineComponent({
    components: {
        ProductItem
    },
    setup() {
        const productStore = useProductStore()
        const products = computed(() => productStore.filteredProducts)

        return {
            products
        }
    }
})
</script>

<template>
    <div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <ProductItem v-for="(product, index) in products" :key="index" v-bind="product" />
        </div>
    </div>
</template>
