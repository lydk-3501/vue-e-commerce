<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { fetchProducts } from '@/api/api'
import StarIcon from '@/components/icons/IconStar.vue'

export default defineComponent({
    name: 'RatingFilter',
    components: {
        StarIcon
    },
    setup() {
        const { t } = useI18n()
        const route = useRoute()
        const router = useRouter()
        const ratingNumbers = [1, 2, 3, 4]
        const selectedRating = ref<number | null>(null)
        const ratingCounts = ref<Record<number, number>>({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        })

        watch(
            () => route.query.rating,
            (newRating) => {
                selectedRating.value = newRating ? Number(newRating) : null
            },
            { immediate: true }
        )

        const handleRatingSelect = (rating: number) => {
            const query = {
                ...route.query,
                rating: rating !== selectedRating.value ? rating : undefined
            }
            router.push({ query }).catch(() => {})
        }

        onMounted(async () => {
            try {
                const products = await fetchProducts()
                const counts = products.reduce(
                    (acc: Record<number, number>, product) => {
                        const rating = Math.floor(product.rating)
                        if (rating >= 1 && rating <= 5) {
                            acc[rating] = (acc[rating] || 0) + 1
                        }
                        return acc
                    },
                    {} as Record<number, number>
                )

                ratingNumbers.forEach((rating) => {
                    if (!counts[rating]) {
                        counts[rating] = 0
                    }
                })

                ratingCounts.value = counts
            } catch (error) {
                console.error('Failed to load products:', error)
            }
        })

        return {
            t,
            ratingNumbers,
            ratingCounts,
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
