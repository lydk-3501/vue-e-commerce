<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'CategoryItem',
    props: {
        label: { type: String, required: true },
        count: { type: String, required: true },
        childrenItems: {
            type: Array as () => Array<{ label: string; childrenItems?: any[] }>,
            default: () => []
        },
        parentActiveMenu: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const route = useRoute()
        const router = useRouter()
        const isSelected = ref(false)
        const activeChild = ref<string | null>(null)

        const activeMenu = () => {
            isSelected.value = true
        }

        const toggleMenu = () => {
            isSelected.value = !isSelected.value
            props.parentActiveMenu()
            updateUrlParams(isSelected.value)

                        async function fetchProductsByCategory(category: string) {
            const response = await fetch(`http://localhost:3000/items?categories[0]=${category}`);
            const products = await response.json();
            return products;
            }

            fetchProductsByCategory("Audio").then((products) => {
            console.log(products);
            });

        }

        const updateUrlParams = (isSelected: boolean) => {
            const currentCategories = (
                Array.isArray(route.query.category)
                    ? route.query.category
                    : typeof route.query.category === 'string'
                      ? [route.query.category]
                      : []
            ) as string[]

            const newCategories = isSelected
                ? [...currentCategories, props.label]
                : currentCategories.filter((item) => item !== props.label)

            router.push({ query: { ...route.query, category: newCategories } })
        }

        watch(
            () => route.query.category,
            (categoryQuery) => {
                const categoryArray = Array.isArray(categoryQuery)
                    ? categoryQuery.filter((item): item is string => typeof item === 'string')
                    : typeof categoryQuery === 'string'
                      ? [categoryQuery]
                      : []

                isSelected.value = categoryArray.includes(props.label)
                activeChild.value = isSelected.value ? props.label : null
            },
            { immediate: true }
        )

        return { isSelected, toggleMenu, activeMenu, activeChild }
    }
})
</script>

<template>
    <div>
        <button class="category-menu-item w-[260px]" @click="toggleMenu">
            <div class="flex items-center h-12 text-black">
                <img
                    :class="['h-3 w-3 transition-transform', isSelected ? '' : 'rotate-180']"
                    src="/images/toggle-icon.svg"
                />
                <span :class="['text-[14.4px] pl-2 truncate', isSelected ? 'font-bold' : '']">
                    {{ label }}
                </span>
                <span
                    class="category-item-count bg-gray-300 font-bold ml-2 px-1 rounded text-[0.64rem] text-gray-600"
                >
                    {{ count }}
                </span>
            </div>
        </button>
        <div
            v-if="childrenItems.length"
            :class="[
                'overflow-hidden duration-300 ease-out transition-max-height',
                isSelected ? '' : 'max-h-0'
            ]"
        >
            <div v-for="(child, index) in childrenItems" :key="index" class="pl-4">
                <CategoryItem
                    :label="child.label"
                    :count="'123'"
                    :childrenItems="child.childrenItems"
                    :isParentSelected="isSelected && activeChild === child.label"
                    :parentActiveMenu="activeMenu"
                />
            </div>
        </div>
    </div>
</template>
