<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CartProductList from '@/components/cart/CartProductList.vue'
import CardDetails from '@/components/cart/CardDetails.vue'

export default defineComponent({
    components: {
        CartProductList,
        CardDetails
    },
    setup() {
        const { t } = useI18n()
        const showCart = ref(true)

        return {
            t,
            showCart
        }
    }
})
</script>

<template>
    <div v-if="showCart" class="text-black">
        <div class="h-screen bg-gray-300">
            <div class="py-12">
                <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
                    <div class="md:flex">
                        <div class="w-full p-4 px-5 py-5">
                            <div class="md:grid md:grid-cols-3 gap-2">
                                <div class="col-span-2 p-5">
                                    <h1 class="text-xl font-medium">{{ $t('cartHeader') }}</h1>

                                    <CartProductList />
                                </div>
                                <div class="p-5 bg-gray-800 rounded overflow-visible">
                                    <CardDetails />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
