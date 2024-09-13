<script lang="ts">
import { defineComponent, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/store/productStore'
import StarIcon from '@/components/icons/IconStar.vue'
import { useFilterStore } from '@/store/store'

export default defineComponent({
    name: 'RatingFilter',
    components: {
        StarIcon
    },
    setup() {
        const { t } = useI18n()
        const route = useRoute()
        const router = useRouter()
        const filterStore = useFilterStore()
        const productStore = useProductStore()

        const ratingNumbers = [1, 2, 3, 4, 5]
        const selectedRating = computed(() => filterStore.selectedRating)

        watch(
            () => route.query.rating,
            (newRating) => {
                filterStore.setSelectedRating(newRating ? Number(newRating) : null)
            },
            { immediate: true }
        )

        const handleRatingSelect = (rating: number) => {
            const query = {
                ...route.query,
                rating: rating !== filterStore.selectedRating ? rating : undefined
            }
            router.push({ query }).catch(() => {})
        }

        onMounted(async () => {
            try {
                await productStore.fetchProductsAndComputeData()
            } catch (error) {
                console.error('Failed to load product data:', error)
            }
        })

        return {
            t,
            ratingNumbers,
            ratingCounts: computed(() => productStore.ratingCounts),
            selectedRating,
            handleRatingSelect
        }
    }
})
</script>

<template>
    <div class="w-[260px] border-t py-8">
        <h2
            class="ratings-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-title tracking-[.08rem] uppercase"
        >
            {{ t('ratingHeader') }}
        </h2>
        <div v-for="rating in ratingNumbers" :key="rating">
            <button
                @click="handleRatingSelect(rating)"
                :class="['flex text-[26px] mb-2', selectedRating !== rating ? 'opacity-60' : '']"
            >
                <template v-for="starIndex in 5" :key="starIndex">
                    <StarIcon
                        :width="'w-6'"
                        :height="'h-6'"
                        :color="starIndex <= rating ? 'text-yellow-500' : 'text-gray-300'"
                        class="mr-2"
                    />
                </template>
                <span
                    class="brand-item-count bg-gray-300 font-bold ml-2 mt-[6px] px-1 rounded tracking-[1.1px] text-[0.64rem] text-gray-600"
                >
                    {{ ratingCounts[rating] || 0 }}
                </span>
            </button>
        </div>
    </div>
</template>
