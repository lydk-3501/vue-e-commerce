<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
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
        },
        updateUrl: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const searchQuery = ref('')
        const router = useRouter()
        let debounceTimeout: ReturnType<typeof setTimeout>

        watch(searchQuery, (newQuery) => {
            if (debounceTimeout) clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(() => {
                if (props.updateUrl) {
                    updateSearchParams(newQuery)
                }
            }, 300)
        })

        const updateSearchParams = (query: string) => {
            if (query) {
                router.push({
                    query: { q: query }
                })
            }
        }

        return {
            searchQuery
        }
    }
})
</script>

<template>
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
</template>
