<script lang="ts">
import { defineComponent } from 'vue'
import FilterList from '@/components/filter/FilterList.vue'

export default defineComponent({
    components: {
        FilterList
    },
    setup() {
        return {}
    }
})
</script>

<template>
    <div className="content flex justify-center">
        <main className="container box-border flex max-w-[1400px] px-4 py-8">
            <FilterList />
            <div className="container-results box-border w-3/4 max-w-[948px] min-w-[500px]"></div>
        </main>
    </div>
</template>
