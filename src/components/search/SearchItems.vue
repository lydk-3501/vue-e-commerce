<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SearchIcon from '../icons/IconSearch.vue'

export default defineComponent({
    components: {
        SearchIcon
    },
    props: {
        inputClass: {
            type: String,
            default:
                'search-box-input focus:outline-none cursor-text text-black pl-16 pr-12 h-16 rounded-lg placeholder-slate-300'
        },
        maxLength: {
            type: Number,
            default: 512
        },
        placeholder: {
            type: String
        },
        autoCapitalize: {
            type: String,
            default: 'off'
        },
        autoComplete: {
            type: String,
            default: 'off'
        },
        autoCorrect: {
            type: String,
            default: 'off'
        },
        spellCheck: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const searchQuery = ref('')
        const router = useRouter()
        let debounceTimeout: ReturnType<typeof setTimeout>

        watch(searchQuery, (newQuery) => {
            if (debounceTimeout) clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(() => {
                updateSearchParams(newQuery)
            }, 300)
        })

        const updateSearchParams = (query: string) => {
            if (query)
                router.push({
                    query: { q: query }
                })
        }

        return {
            searchQuery
        }
    }
})
</script>

<template>
    <form class="search-box-form flex flex-col bg-white h-16 rounded-lg align-middle static">
        <input
            v-model="searchQuery"
            :class="inputClass"
            :maxLength="maxLength"
            :placeholder="placeholder"
            :autoCapitalize="autoCapitalize"
            :autoComplete="autoComplete"
            :autoCorrect="autoCorrect"
            :spellCheck="spellCheck"
            type="search"
        />
        <button
            class="search-box-submit absolute h-16 text-search-icon text-xl pl-4 pr-4 text-yellow-500"
            type="submit"
        >
            <SearchIcon />
        </button>
    </form>
</template>
