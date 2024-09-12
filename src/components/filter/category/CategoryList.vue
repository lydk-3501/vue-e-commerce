<script lang="ts">
import { defineComponent } from 'vue'
import CategoryItem from './CategoryItem.vue'
import { categoryItems } from '@/constants/category.constant'

export default defineComponent({
    components: {
        CategoryItem
    },
    setup() {
        return {
            categoryItems
        }
    }
})
</script>

<template>
    <div class="flex flex-col border-t py-8 w-[260px]">
        <h2
            class="category-menu-header font-hind font-semibold uppercase text-[0.678rem] text-title pb-4 tracking-[.08rem]"
        >
            {{ $t('categoryMenuHeader') }}
        </h2>
        <div v-for="(item, index) in categoryItems" :key="index">
            <CategoryItem :label="item.label" count="123" :childrenItems="item.childrenItems" />
        </div>
    </div>
</template>
