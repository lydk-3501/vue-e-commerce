<script lang="ts">
import { defineComponent, computed } from 'vue'
import CartProduct from '../cart/CartProduct.vue'

import { useCartStore } from '@/store/cartStore'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    components: {
        CartProduct
    },
    setup() {
        const { t } = useI18n()
        const cartStore = useCartStore()
        const cartProducts = computed(() => cartStore.$state.cartProducts)
        const cartTotal = computed(() => cartStore.cartTotal)

        return {
            t,
            cartProducts,
            cartTotal
        }
    }
})
</script>

<template>
    <div>
        <CartProduct
            v-for="(cartProduct, index) in cartProducts"
            :key="index"
            v-bind="cartProduct"
        />

        <div class="flex justify-between items-center mt-6 pt-6 border-t">
            <div class="flex items-center">
                <i class="fa fa-arrow-left text-sm pr-2"></i>
                <span class="text-md font-medium text-blue-500">{{ t('continueShopping') }}</span>
            </div>

            <div class="flex justify-center items-end">
                <span class="text-sm font-medium text-gray-400 mr-1">{{ t('subtotal') }}:</span>
                <span class="text-lg font-bold text-gray-800">{{ cartTotal.toFixed(2) }}</span>
            </div>
        </div>
    </div>
</template>
