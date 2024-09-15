<script lang="ts">
import { defineComponent } from 'vue'
import FilterList from '@/components/filter/FilterList.vue'
import ProductList from '@/components/product/ProductList.vue'
import HeaderSection from '@/components/header/HeaderSection.vue'

export default defineComponent({
    components: {
        FilterList,
        ProductList,
        HeaderSection
    }
})
</script>

<template>
    <HeaderSection />
    <div class="content flex justify-center">
        <main class="container box-border flex max-w-[1400px] px-4 py-8">
            <FilterList />
            <div class="container-results box-border w-3/4 max-w-[948px] min-w-[500px]">
                <ProductList />
            </div>
        </main>
    </div>
</template>
