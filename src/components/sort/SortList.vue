<script lang="ts">
import { defineComponent } from 'vue'
import SortBy from './SortBy.vue'
import HitsPerPage from './HitsPerPage.vue'
import './sortlist.css'

export default defineComponent({
    components: {
        SortBy,
        HitsPerPage
    },
    setup() {
        return {}
    }
})
</script>

<template>
    <div className="container-options flex justify-end border-b py-[6px] mb-[30px]">
        <SortBy />
        <HitsPerPage />
    </div>
</template>
