<script lang="ts">
import { defineComponent } from 'vue'
import CategoryList from './category/CategoryList.vue'

export default defineComponent({
    components: {
        CategoryList
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
            </div>
        </section>
    </div>
</template>
