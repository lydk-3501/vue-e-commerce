<script lang="ts">
import { defineComponent, computed } from 'vue'
import CategoryItem from './CategoryItem.vue'
import { categoryItems } from '@/constants/category.constant'
import { useProductStore } from '@/store/productStore'

export default defineComponent({
    components: {
        CategoryItem
    },
    setup() {
        const productStore = useProductStore()

        const categoryCounts = computed(() => {
            const counts: Record<string, number> = {}

            productStore.filteredProducts.forEach((product) => {
                product.categories.forEach((category) => {
                    counts[category] = (counts[category] || 0) + 1
                })
            })

            return counts
        })

        return {
            categoryItems,
            categoryCounts
        }
    }
})
</script>

<template>
    <div class="flex flex-col border-t py-8 w-full">
        <h2
            class="category-menu-header font-hind font-semibold uppercase text-[0.678rem] text-title pb-4 tracking-[.08rem]"
        >
            {{ $t('categoryMenuHeader') }}
        </h2>
        <div v-for="(item, index) in categoryItems" :key="index">
            <CategoryItem
                :label="item.label"
                :count="categoryCounts[item.label] || 0"
                :childrenItems="item.childrenItems"
            />
        </div>
    </div>
</template>
