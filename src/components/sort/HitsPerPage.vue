<template>
    <div class="dropdown inline-block relative w-30">
        <button
            class="dropbtn flex items-center py-4 px-6 text-xs border-none cursor-pointer"
            @click="toggleDropdown"
        >
            {{ hitsPerPageOptions[hits] }} {{ $t('hitsPerPages') }}
            <img
                class="h-3 w-3"
                src="../../../../public/images/toggle-icon.svg"
                :alt="$t('toggleIconAlt')"
            />
        </button>
        <div
            v-if="isOpen"
            class="dropdown-content absolute bg-slate-50 min-w-[160px] rounded-md right-0 shadow-lg text-xs z-10"
        >
            <a
                v-for="(label, value) in hitsPerPageOptions"
                :key="value"
                class="block px-4 py-3 text-black hover:bg-gray-100 cursor-pointer"
                @click="handleOptionClick(value)"
            >
                {{ label }} {{ $t('hitsPerPages') }}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useProductStore } from '@/store/productStore'
import { useI18n } from 'vue-i18n'

type HitsPerPageOptions = 16 | 32 | 64

export default defineComponent({
    setup() {
        const { t } = useI18n()
        const store = useProductStore()
        const isOpen = ref(false)
        const hits = computed(() => store.$state.hitsPerPage)
        const toggleDropdown = () => {
            isOpen.value = !isOpen.value
        }

        const handleOptionClick = (option: HitsPerPageOptions) => {
            store.setHitsPerPage(option)
            isOpen.value = false
        }

        const hitsPerPageOptions = computed<Record<HitsPerPageOptions, number>>(() => ({
            16: 16,
            32: 32,
            64: 16
        }))

        return {
            hits,
            isOpen,
            toggleDropdown,
            handleOptionClick,
            hitsPerPageOptions
        }
    }
})
</script>
