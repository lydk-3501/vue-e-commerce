<template>
    <nav class="inline-flex space-x-px rounded-md border-none" aria-label="Pagination">
        <button
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-2 py-2 text-gray-400 hover:bg-gray-50 rounded-l-md"
        >
            <img class="h-3 w-3 rotate-90" src="../../../../public/images/toggle-icon.svg" />
        </button>

        <template v-if="startPage > 1">
            <button
                @click="handlePageChange(1)"
                class="px-4 py-2 text-[14.4px] text-gray-900 bg-gray-50 hover:bg-gray-100 rounded"
            >
                1
            </button>
            <span v-if="startPage > 2" class="px-4 py-2 text-[14.4px] text-gray-700 bg-gray-50">
                ...
            </span>
        </template>

        <button
            v-for="page in visiblePages"
            :key="page"
            @click="handlePageChange(page)"
            :class="{
                'px-4 py-2 text-[14.4px]': true,
                'bg-gradient-to-b from-yellow-400 to-orange-400 font-semibold text-white':
                    page === currentPage,
                'text-black bg-gray-50 hover:bg-gray-100': page !== currentPage
            }"
            class="rounded"
        >
            {{ page }}
        </button>

        <template v-if="endPage < totalPages">
            <span
                v-if="endPage < totalPages - 1"
                class="px-4 py-2 text-[14.4px] text-gray-700 bg-gray-50"
            >
                ...
            </span>
            <button
                @click="handlePageChange(totalPages)"
                class="px-4 py-2 text-[14.4px] text-gray-900 bg-gray-50 hover:bg-gray-100 rounded"
            >
                {{ totalPages }}
            </button>
        </template>

        <button
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-2 py-2 text-gray-400 hover:bg-gray-50 rounded-r-md"
        >
            <img
                class="h-3 w-3 rotate-90 -scale-y-100"
                src="../../../../public/images/toggle-icon.svg"
            />
        </button>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProductStore } from '@/store/productStore'

export default defineComponent({
    name: 'PaginationItems',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const productStore = useProductStore()

        const handlePageChange = (page: number) => {
            if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
                productStore.setCurrentPage(page)
                updateUrlParam(page)
            }
        }

        const updateUrlParam = (page: number) => {
            const url = new URL(window.location.href)
            const params = new URLSearchParams(url.search)
            params.set('page', page.toString())
            window.history.pushState({}, '', `${url.pathname}?${params}`)
        }

        const maxVisiblePages = 5

        const startPage = computed(() =>
            Math.max(
                1,
                Math.min(
                    props.currentPage - Math.floor(maxVisiblePages / 2),
                    props.totalPages - maxVisiblePages + 1
                )
            )
        )

        const endPage = computed(() =>
            Math.min(props.totalPages, startPage.value + maxVisiblePages - 1)
        )

        const visiblePages = computed(() => {
            return Array.from(
                { length: endPage.value - startPage.value + 1 },
                (_, i) => startPage.value + i
            )
        })

        return {
            startPage,
            endPage,
            visiblePages,
            handlePageChange
        }
    }
})
</script>
