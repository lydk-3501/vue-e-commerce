<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const { t } = useI18n()
        const router = useRouter()

        const handleCheckout = () => {
            setTimeout(() => {
                router.push({ path: '/' })
            }, 500) // Giả lập thời gian chờ để xử lý mua hàng
        }

        return {
            t,
            handleCheckout
        }
    }
})
</script>
<template>
    <span class="text-xl font-medium text-gray-100 block pb-3">{{ $t('cartDetails') }}</span>
    <span class="text-xs text-gray-400">{{ $t('cartType') }}</span>

    <div class="overflow-visible flex justify-between items-center mt-2">
        <div class="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
            <span class="italic text-lg font-medium text-gray-200 underline">{{ $t('visa') }}</span>
            <div class="flex justify-between items-center pt-4">
                <span class="text-xs text-gray-200 font-medium">****</span>
                <span class="text-xs text-gray-200 font-medium">****</span>
                <span class="text-xs text-gray-200 font-medium">****</span>
                <span class="text-xs text-gray-200 font-medium">****</span>
            </div>
            <div class="flex justify-between items-center mt-3">
                <span class="text-xs text-gray-200"></span>
                <span class="text-xs text-gray-200">12/18</span>
            </div>
        </div>
        <div class="flex justify-center items-center flex-col">
            <img
                src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                width="40"
                class="relative right-5"
            />
            <span class="text-xs font-medium text-gray-200 bottom-2 relative right-5"
                >mastercard.</span
            >
        </div>
    </div>

    <div class="flex justify-center flex-col pt-3">
        <label class="text-xs text-gray-400">{{ $t('nameOnCard') }}</label>
        <input
            type="text"
            class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder=""
        />
    </div>

    <div class="flex justify-center flex-col pt-3">
        <label class="text-xs text-gray-400">{{ $t('cartNumber') }}</label>
        <input
            type="text"
            class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="**** **** **** ****"
        />
    </div>

    <div class="grid grid-cols-3 gap-2 pt-2 mb-3">
        <div class="col-span-2">
            <label class="text-xs text-gray-400">{{ $t('expirationDate') }}</label>
            <div class="grid grid-cols-2 gap-2">
                <input
                    type="text"
                    class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                    placeholder="mm"
                />
                <input
                    type="text"
                    class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                    placeholder="yyyy"
                />
            </div>
        </div>
        <div>
            <label class="text-xs text-gray-400">CVV</label>
            <input
                type="text"
                class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                placeholder="XXX"
            />
        </div>
    </div>

    <button
        class="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
        @click="handleCheckout"
    >
        {{ $t('checkOut') }}
    </button>
</template>
