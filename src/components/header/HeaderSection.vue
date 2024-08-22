<script lang="ts">
import './header.css' 
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import AlgoliaIcon from '../icons/IconAlgolia.vue'
import SearchItems from '../search/SearchItems.vue';

export default defineComponent({
    components: {
        AlgoliaIcon,
        SearchItems
    },
    setup() {
        const { t } = useI18n();
        const searchQuery = ref('')
        const placeholder = ref(t('searchPlaceholder'))

        return {
            searchQuery,
            placeholder
        }
    }
})
</script>

<template>
    <header
    class="header bg-transparent bg-cover bg-center bg-no-repeat bg-gradient-to-b from-yellow-400 to-orange-400 flex flex-col h-96 items-center justify-center px-4 py-2 text-center text-white"
    >
        <p class="header-logo">
            <a :href="'https://algolia.com'" :aria-label="$t('headerLogoLabel')">
                <AlgoliaIcon />
            </a>
        </p>
        <p class="header-title text-4xl font-thin my-12">
            {{ $t('headerTitle') }}
        </p>
        <div class="search-box h-16 w-4/5 max-w-[740px] relative">
            <SearchItems :searchQuery="searchQuery" :placeholder="placeholder" />
        </div>
    </header>
</template>
