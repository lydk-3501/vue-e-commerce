<script lang="ts">
import './header.css'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AlgoliaIcon from '../icons/IconAlgolia.vue'
import SearchItems from '../search/SearchItems.vue'
import SearchIcon from '../icons/IconSearch.vue'
import CartIcon from '../icons/IconCart.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    components: {
        AlgoliaIcon,
        SearchItems,
        SearchIcon,
        CartIcon
    },
    setup() {
        const { t } = useI18n()
        const searchQuery = ref('')
        const placeholder = ref(t('searchPlaceholder'))
        const router = useRouter()

        const goToCart = () => {
            router
                .push('/cart')
                .then(() => {
                    // Thực hiện các hành động sau khi navigation hoàn tất
                    console.log('Navigation to Cart completed!')
                })
                .catch((error) => {
                    console.error('Navigation error:', error)
                })
        }

        return {
            searchQuery,
            placeholder,
            goToCart
        }
    }
})
</script>

<template>
    <header
        class="header bg-transparent bg-cover bg-center bg-no-repeat bg-gradient-to-b from-yellow-400 to-orange-400 flex flex-col h-96 items-center justify-center px-4 py-2 relative text-center text-white"
    >
        <div>
            <button
                @click="goToCart"
                class="absolute bg-white h-8 flex justify-center w-16 top-0 right-0 rounded m-8"
            >
                <CartIcon />
            </button>
        </div>
        <p class="header-logo">
            <a :href="'https://algolia.com'" :aria-label="$t('headerLogoLabel')">
                <AlgoliaIcon />
            </a>
        </p>
        <p class="header-title text-4xl font-thin my-12">
            {{ $t('headerTitle') }}
        </p>
        <div class="search-box h-16 w-4/5 max-w-[740px] relative">
            <form
                class="search-box-form flex flex-col bg-white h-16 rounded-lg align-middle static"
            >
                <SearchItems :searchQuery="searchQuery" :placeholder="placeholder" />
                <button
                    class="search-box-submit absolute h-16 text-search-icon text-xl pl-4 pr-4 text-yellow-500"
                    type="submit"
                >
                    <SearchIcon />
                </button>
            </form>
        </div>
    </header>
</template>
