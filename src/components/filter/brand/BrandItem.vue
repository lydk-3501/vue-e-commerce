<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BrandItem',
    props: {
        label: { type: String, required: true },
        count: { type: Number, required: true },
        value: { type: String, required: true },
        query: { type: String, default: '' },
        selected: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        const handleBrandSelect = () => {
            emit(props.selected ? 'unselectBrand' : 'selectBrand', props.value)
        }

        const highlight = (text: string, query: string) => {
            if (!query) return text

            const escapedSearchQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`(${escapedSearchQuery})`, 'gi')
            return text.replace(regex, '<span class="bg-yellow-300">$1</span>')
        }

        return {
            handleBrandSelect,
            highlight
        }
    }
})
</script>

<template>
    <div class="brand-item pb-4 text-black">
        <input
            class="brand-checkbox mr-4"
            type="checkbox"
            :value="value"
            :checked="selected"
            @change="handleBrandSelect"
        />
        <span
            :class="['brand-item-label text-[0.9rem]', selected ? 'font-bold' : '']"
            v-html="highlight(label, query)"
        >
        </span>
        <span
            class="brand-item-count bg-gray-300 font-bold ml-2 px-1 rounded tracking-[1.1px] text-[0.64rem] text-gray-600"
        >
            {{ count }}
        </span>
    </div>
</template>
