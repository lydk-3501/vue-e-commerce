<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BrandItem from './BrandItem.vue'
import SearchItems from '@/components/search/SearchItems.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import { useFilterStore } from '@/store/store'
import { useProductStore } from '@/store/productStore'

export default defineComponent({
    name: 'BrandList',
    components: {
        BrandItem,
        SearchItems,
        SearchIcon
    },
    setup() {
        const { t } = useI18n()
        const filterStore = useFilterStore()
        const productStore = useProductStore()
        const route = useRoute()
        const router = useRouter()
        const placeholder = ref(t('brandSearchPlaceholder'))
        const searchQuery = ref('')
        const selectedBrands = computed(() => filterStore.selectedBrands)
        const brandItems = computed(() => productStore.brandItems)
        const brandCounts = computed(() => productStore.brandCounts)

        const filteredBrands = computed(() => {
            const query = searchQuery.value.toLowerCase()
            if (!query) return brandItems.value

            return brandItems.value.filter((brand) => brand.toLowerCase().includes(query))
        })

        const sortedBrands = computed(() => {
            return [...filteredBrands.value]
                .sort((a, b) => (brandCounts.value[b] || 0) - (brandCounts.value[a] || 0))
                .slice(0, 10)
        })

        const updateURL = () => {
            const query = { ...route.query }

            Object.keys(query).forEach((key) => {
                if (key.startsWith('brand[')) {
                    delete query[key]
                }
            })

            filterStore.selectedBrands.forEach((brand, index) => {
                query[`brand[${index + 1}]`] = brand
            })

            router.push({ query })
        }

        const addBrand = (brand: string) => {
            filterStore.addBrand(brand)
            updateURL()
        }

        const removeBrand = (brand: string) => {
            filterStore.removeBrand(brand)
            updateURL()
        }

        onMounted(async () => {
            try {
                await productStore.fetchProductsAndComputeData()
            } catch (error) {
                console.error('Failed to fetch brand data:', error)
            }
        })

        return {
            t,
            sortedBrands,
            placeholder,
            searchQuery,
            addBrand,
            removeBrand,
            selectedBrands,
            brandCounts
        }
    }
})
</script>


<template>
    <div class="brand-menu border-t py-8 w-[260px]">
        <div>
            <h2
                class="brand-menu-header leading-normal font-semibold font-hind pb-4 text-[0.678rem] text-title tracking-[.08rem] uppercase"
            >
                {{ t('brandMenuHeader') }}
            </h2>
        </div>

        <div v-if="selectedBrands.length" class="selected-brands mb-4">
            <span
                v-for="(brand, index) in selectedBrands"
                :key="index"
                class="brand-tag inline-flex items-center bg-amber-200 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded"
            >
                {{ brand }}
                <button @click="removeBrand(brand)" class="ml-2 text-red-500">✕</button>
            </span>
        </div>

        <form
            class="brand-search-form border flex flex-col h-10 mb-4 rounded-lg align-middle static"
        >
            <SearchItems
                v-model="searchQuery"
                input-class="brand-search-input bg-slate-100 cursor-text focus:outline-none focus:border-none focus:ring-0 h-16
                            text-black rounded-lg placeholder-slate-400 pl-8 pr-2"
                :placeholder="placeholder"
                :updateUrl="false"
            />
            <button class="search-box-submit absolute h-10 font-light text-black pl-1 pr-1">
                <SearchIcon />
            </button>
        </form>

        <div>
            <BrandItem
                v-for="(item, index) in sortedBrands"
                :key="index"
                :label="item"
                :count="brandCounts[item] || 0"
                :value="item"
                :query="searchQuery"
                :selected="selectedBrands.includes(item)"
                @selectBrand="addBrand"
                @unselectBrand="removeBrand"
            />
        </div>
    </div>
</template>
