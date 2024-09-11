<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'FreeShipping',
    setup() {
        const { t } = useI18n()
        const isFreeShipping = ref(false)

        const route = useRoute()
        const router = useRouter()

        if (route.query.freeShipping === 'true') {
            isFreeShipping.value = true
        }

        const handleToggle = () => {
            isFreeShipping.value = !isFreeShipping.value
        }

        watch(isFreeShipping, (newValue) => {
            const query = { ...route.query }
            if (newValue) {
                query.freeShipping = 'true'
            } else {
                delete query.freeShipping
            }
            router.push({ query })
        })

        return {
            t,
            isFreeShipping,
            handleToggle
        }
    }
})
</script>

<template>
    <div class="w-[260px] border-t py-8">
        <h2
            class="freeshipping-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-title tracking-[.08rem] uppercase"
        >
            {{ t('freeshippingHeader') }}
        </h2>
        <div class="flex justify-items-between text-black">
            <span class="toggle-label text-sm">
                {{ t('freeshippingToggleLabel') }}
            </span>
            <span class="text-xs">
                {{ isFreeShipping ? t('yes') : t('no') }}
            </span>
            <div
                class="cursor-pointer h-[16px] ml-1 w-[30px] rounded-full flex justify-items-between"
                :class="isFreeShipping ? 'bg-yellow-500' : 'bg-gray-300'"
                @click="handleToggle"
            >
                <div
                    class="bg-white w-[16px] h-[16px] rounded-full shadow-md transform transition-transform duration-300"
                    :class="isFreeShipping ? 'translate-x-[14px]' : 'translate-x-0'"
                ></div>
            </div>
        </div>
    </div>
</template>
