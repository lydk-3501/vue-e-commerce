<script lang="ts">
import { defineComponent } from 'vue'
import CategoryList from './category/CategoryList.vue'
import BrandList from './brand/BrandList.vue'
import FreeShipping from './freeshipping/FreeShipping.vue'
import RatingFilter from './ratings/RatingFilter.vue'
import PriceSlider from './priceslider/PriceSlider.vue'

export default defineComponent({
    components: {
        CategoryList,
        BrandList,
        FreeShipping,
        RatingFilter,
        PriceSlider
    },
    setup() {
        return {}
    }
})
</script>

<template>
    <div className="container-wrapper w-[320px]">
        <section className="container-filter">
            <div className="filter-header h-[60px] items-center flex justify-between w-[260px]">
                <h2 className="text-2xl font-hind font-semibold text-black">
                    {{ $t('containerHeader') }}
                </h2>
            </div>
            <div className="filter-body">
                <CategoryList />
                <BrandList />
                <PriceSlider />
                <FreeShipping />
                <RatingFilter />
            </div>
        </section>
    </div>
</template>
