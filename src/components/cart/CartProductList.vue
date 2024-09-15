<script lang="ts">
import { defineComponent, ref } from 'vue'
import CartProduct from '../cart/CartProduct.vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
    components: {
        CartProduct
    },
    setup() {
        const { t } = useI18n()
        const cartProducts = ref([
            {
                name: 'abc',
                categories: ['Cell Phones', 'All Cell Phones with Plans'],
                price: 9.9,
                image: 'https://cdn-demo.algolia.com/bestbuy-0118/5581586_sb.jpg'
            },
            {
                name: 'abc',
                categories: ['Cell Phones', 'All Cell Phones with Plans'],
                price: 9.9,
                image: 'https://cdn-demo.algolia.com/bestbuy-0118/5581586_sb.jpg'
            },
            {
                name: 'abc',
                categories: ['Cell Phones', 'All Cell Phones with Plans'],
                price: 9.9,
                image: 'https://cdn-demo.algolia.com/bestbuy-0118/5581586_sb.jpg'
            }
        ])

        return {
            t,
            cartProducts
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
                <span class="text-md font-medium text-blue-500">{{ $t('continueShopping') }}</span>
            </div>

            <div class="flex justify-center items-end">
                <span class="text-sm font-medium text-gray-400 mr-1">{{ $t('subtotal') }}:</span>
                <span class="text-lg font-bold text-gray-800">$24.90</span>
            </div>
        </div>
    </div>
</template>
