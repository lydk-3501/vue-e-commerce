<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { debounce } from '@/utils/debounce'
import { useProductStore } from '@/store/productStore'

export default defineComponent({
    name: 'PriceRangeSlider',
    props: {
        min: { type: Number, default: 1 },
        max: { type: Number, default: 4800 }
    },
    setup(props) {
        const { t } = useI18n()
        const route = useRoute()
        const router = useRouter()
        const productStore = useProductStore()

        const values = computed(() => [
            productStore.$state.priceRange[0],
            productStore.$state.priceRange[1]
        ])

        const trackStyle = computed(() => {
            const minPos = ((values.value[0] - props.min) / (props.max - props.min)) * 100
            const maxPos = ((values.value[1] - props.min) / (props.max - props.min)) * 100

            return {
                background: `linear-gradient(
                            to right,
                            #ddd 0%, 
                            #ddd ${minPos}%, 
                            #ffc00c ${minPos}%, 
                            #ffc00c ${maxPos}%, 
                            #ddd ${maxPos}%, 
                            #ddd 100%)`
            }
        })

        const thumbStyle = (index: number) => ({
            left: `${((values.value[index] - props.min) / (props.max - props.min)) * 100}%`,
            transform: 'translateX(-50%) translateY(-40%)'
        })

        const updateQueryParams = debounce(() => {
            productStore.updatePriceRange(values.value[0], values.value[1])
            if (values.value[0] !== props.min || values.value[1] !== props.max) {
                router.push({
                    query: { ...route.query, priceMin: values.value[0], priceMax: values.value[1] }
                })
            }
        }, 300)

        const startDrag = (index: number) => {
            const updateValue = (event: MouseEvent | TouchEvent) => {
                const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect()
                const offsetX = (event as MouseEvent).clientX - (rect?.left || 0)
                const newValue = Math.round(
                    (offsetX / (rect?.width || 1)) * (props.max - props.min) + props.min
                )

                values.value[index] = Math.min(props.max, Math.max(props.min, newValue))
                if (index === 0 && values.value[0] > values.value[1])
                    values.value[0] = values.value[1]
                if (index === 1 && values.value[1] < values.value[0])
                    values.value[1] = values.value[0]

                updateQueryParams()
            }

            const stopDrag = () => {
                window.removeEventListener('mousemove', updateValue)
                window.removeEventListener('mouseup', stopDrag)
                window.removeEventListener('touchmove', updateValue)
                window.removeEventListener('touchend', stopDrag)
            }

            window.addEventListener('mousemove', updateValue)
            window.addEventListener('mouseup', stopDrag)
            window.addEventListener('touchmove', updateValue)
            window.addEventListener('touchend', stopDrag)
        }

        watch(
            () => route.query.priceMin,
            (newMin) => {
                productStore.priceRange[0] = Number(newMin) || props.min
            }
        )

        watch(
            () => route.query.priceMax,
            (newMax) => {
                productStore.priceRange[1] = Number(newMax) || props.max
            }
        )

        return {
            t,
            values,
            trackStyle,
            thumbStyle,
            startDrag
        }
    }
})
</script>

<template>
    <div class="w-[260px] border-t py-8">
        <h2
            class="slider-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-title tracking-[.08rem] uppercase"
        >
            {{ t('sliderHeader') }}
        </h2>
        <div class="relative w-full h-1 rounded bg-gray-200">
            <div class="absolute inset-0 rounded" :style="trackStyle" />
            <div
                v-for="(value, index) in values"
                :key="index"
                class="absolute w-4 h-4 bg-white border border-gray-300 rounded-full cursor-pointer"
                :style="thumbStyle(index)"
                @mousedown="startDrag(index)"
                @touchstart="startDrag(index)"
            />
        </div>
        <div class="flex justify-between mt-2 text-sm text-black">
            <span class="font-semibold">
                <span class="text-amber-500">$</span>
                {{ values[0] }}
            </span>
            <span class="font-semibold">
                <span class="text-amber-500">$</span>
                {{ values[1] }}
            </span>
        </div>
    </div>
</template>
