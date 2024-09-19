<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: { type: String, required: true },
        categories: { type: Array<String>, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    },
    setup() {
        return {}
    }
})
</script>
<template>
    <div class="flex justify-between items-center mt-6 pt-6">
        <div class="flex items-center">
            <img :src="image" class="rounded w-12 pr-4" />

            <div class="flex flex-col ml-3">
                <span class="md:text-md font-medium">{{ name }}</span>
                <span class="text-xs font-light text-gray-400">{{ categories.join(' & ') }}</span>
            </div>
        </div>

        <div class="flex justify-center items-center">
            <div class="pr-8 flex">
                <span class="font-semibold">-</span>
                <input
                    type="text"
                    class="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
                    :value="quantity"
                />
                <span class="font-semibold">+</span>
            </div>

            <div class="pr-8">
                <span class="text-xs font-medium">${{ price }}</span>
            </div>
            <div>
                <i class="fa fa-close text-xs font-medium"></i>
            </div>
        </div>
    </div>
</template>
