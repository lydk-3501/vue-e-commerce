<template>
    <div class="dropdown inline-block relative w-30">
        <button
            class="dropbtn flex items-center py-4 px-6 text-xs border-none cursor-pointer"
            @click="toggleDropdown"
        >
            {{ sortOptions[sortBy] }}
            <img
                class="h-3 w-3"
                src="../../../../public/images/toggle-icon.svg"
                :alt="$t('toggleIconAlt')"
            />
        </button>
        <div
            v-if="isOpen"
            class="dropdown-content absolute bg-slate-50 min-w-[160px] rounded-md right-0 shadow-lg text-xs z-10"
        >
            <a
                v-for="(label, criteria) in sortOptions"
                :key="criteria"
                class="block px-4 py-3 text-black hover:bg-gray-100 cursor-pointer"
                @click="handleOptionClick(criteria)"
            >
                {{ label }}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useProductStore } from '@/store/productStore'
import { useI18n } from 'vue-i18n'

type SortCriteria = 'priceAsc' | 'priceDesc' | 'ratingAsc' | 'ratingDesc' | 'feature'

export default defineComponent({
    setup() {
        const { t } = useI18n()
        const productStore = useProductStore()
        const isOpen = ref(false)

        // Use computed property to get the current sort option from the store
        const sortBy = computed(() => productStore.sortBy)

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value
        }

        const handleOptionClick = (criteria: SortCriteria) => {
            productStore.setSortBy(criteria)
            isOpen.value = false
        }

        // Define sort options with translation
        const sortOptions = computed<Record<SortCriteria, string>>(() => ({
            priceAsc: t('sortPriceAsc'),
            priceDesc: t('sortPriceDesc'),
            ratingAsc: t('sortRatingAsc'),
            ratingDesc: t('sortRatingDesc'),
            feature: t('sortFeature') // Add 'feature' if it's a valid sort option
        }))

        return {
            isOpen,
            toggleDropdown,
            handleOptionClick,
            sortOptions,
            sortBy,
            t
        }
    }
})
</script>

<style scoped>
/* Add your styles here */
</style>
