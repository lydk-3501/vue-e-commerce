<script lang="ts">
import './header.css'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AlgoliaIcon from '../icons/IconAlgolia.vue'
import SearchItems from '../search/SearchItems.vue'
import SearchIcon from '../icons/IconSearch.vue'
import CartIcon from '../icons/IconCart.vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cartStore'

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
        const cartStore = useCartStore()
        const cartQuantity = computed(() => cartStore.cartProducts.length)

        const goToCart = () => {
            router.push('/cart').catch((error) => {
                console.error('Navigation error:', error)
            })
        }

        const handleLoginLogout = () => {
            if (cartStore.isLogin) {
                cartStore.setLoginFlag(false)
            } else {
                router.push({ name: 'login' }).catch((error) => {
                    console.error('Navigation error:', error)
                })
                cartStore.setLoginFlag(true)
            }
        }

        return {
            cartQuantity,
            searchQuery,
            placeholder,
            goToCart,
            isLogin: computed(() => cartStore.isLogin),
            handleLoginLogout
        }
    }
})
</script>

<template>
    <header
        class="header bg-transparent bg-cover bg-center bg-no-repeat bg-gradient-to-b from-yellow-400 to-orange-400 flex flex-col h-96 items-center justify-center px-4 py-2 relative text-center text-white"
    >
        <div class="flex space-x-4 absolute top-4 right-4">
            <button
                v-if="isLogin"
                @click="handleLoginLogout"
                class="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded mt-2"
            >
                {{ $t('logout') }}
            </button>
            <button
                v-else
                @click="handleLoginLogout"
                class="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mt-2"
            >
                {{ $t('login') }}
            </button>

            <button
                @click="goToCart"
                class="bg-white h-8 flex items-center justify-center w-16 rounded m-2 py-1"
            >
                <span>
                    <CartIcon />
                    <span
                        class="bg-red-500 absolute top-0 ml-6 flex mt-1 rounded-full text-[10px] text-white w-4 h-4 items-center justify-center"
                    >
                        {{ cartQuantity }}
                    </span>
                </span>
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
