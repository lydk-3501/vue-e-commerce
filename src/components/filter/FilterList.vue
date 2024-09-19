<script lang="ts">
import { defineComponent, ref } from 'vue'
import CategoryList from './category/CategoryList.vue'
import BrandList from './brand/BrandList.vue'
import FreeShipping from './freeshipping/FreeShipping.vue'
import RatingFilter from './ratings/RatingFilter.vue'
import PriceSlider from './priceslider/PriceSlider.vue'
import ClearFilter from './ClearFilter.vue'
import MenuIcon from '../icons/IconMenu.vue'

import './filter.css'

export default defineComponent({
    components: {
        CategoryList,
        BrandList,
        FreeShipping,
        RatingFilter,
        PriceSlider,
        ClearFilter,
        MenuIcon
    },
    setup() {
        const isMenuVisible = ref(false)

        const toggleMenu = () => {
            isMenuVisible.value = !isMenuVisible.value
        }

        return {
            isMenuVisible,
            toggleMenu
        }
    }
})
</script>

<template>
    <!-- Main filter container for larger screens -->
    <div class="container-wrapper w-[320px]">
        <section class="container-filter">
            <div class="filter-header h-[60px] items-center flex justify-between w-[260px]">
                <h2 class="text-2xl font-hind font-semibold text-black">
                    {{ $t('containerHeader') }}
                </h2>
                <ClearFilter />
            </div>
            <div class="filter-body w-[260px]">
                <CategoryList />
                <BrandList />
                <PriceSlider />
                <FreeShipping />
                <RatingFilter />
            </div>
        </section>
    </div>

    <!-- Filter overlay for smaller screens -->
    <div
        v-if="isMenuVisible"
        class="filter-overlay flex fixed bottom-0 right-0 w-full h-2/3 bg-white z-50 p-4"
    >
        <div class="filter-body overflow-y-auto overflow-x-hidden w-full">
            <h2 class="text-2xl font-hind font-semibold text-black mb-4">
                {{ $t('containerHeader') }}
            </h2>
            <CategoryList />
            <BrandList />
            <PriceSlider />
            <FreeShipping />
            <RatingFilter />
            <button
                @click="toggleMenu"
                class="filter-icon fixed bottom-4 right-1/2 text-white font-bold bg-yellow-400 p-2 rounded"
            >
                View results
            </button>
        </div>
    </div>

    <!-- Menu icon for small screens -->
    <button
        v-if="!isMenuVisible"
        @click="toggleMenu"
        class="filter-icon fixed bottom-4 right-4 lg:hidden"
    >
        <MenuIcon />
    </button>
</template>
