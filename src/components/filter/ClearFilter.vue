<template>
    <button
        @click="clearAllFilters"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
        Clear Filters
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProductStore } from '@/store/productStore'
import router from '@/router'

export default defineComponent({
    name: 'ClearFilters',
    setup() {
        const productStore = useProductStore()

        const clearAllFilters = () => {
            // Clear filters in the store
            productStore.clearFilters()

            router.push('/')
        }

        return {
            clearAllFilters
        }
    }
})
</script>
