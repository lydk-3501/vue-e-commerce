<script lang="ts">
import { defineComponent, ref } from 'vue'
import StarIcon from '../icons/IconStar.vue'
import FreeShippingIcon from '../icons/IconFreeShipping.vue'

export default defineComponent({
    components: {
        StarIcon,
        FreeShippingIcon
    },
    props: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        categories: { type: Array<String>, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        image: { type: String, required: true },
        free_shipping: { type: Boolean, required: true }
    },
    setup() {
        const showModal = ref(false)  // Modal state


        const addToCart = () => {
            // Logic for adding the item to the cart
            console.log('Item added to cart')
        }

        const toggleModal = () => {
            showModal.value = !showModal.value
        }

        return {
            addToCart,
            showModal,
            toggleModal
        }
    }
})
</script>

<template>
    <article
        class="item rounded-lg duration-200 hover:shadow-lg hover:scale-105 max-w-56 min-w-[175px] px-4 transition-all"
    >
        <header class="image-container items-center flex mx-3 max-w-[175px] h-[175px]">
            <img class="object-cover" :src="image" :alt="name" />
        </header>
        <div class="info-container inline-block group">
            <p class="item-category font-semibold mb-2 mt-3 text-gray-500 text-xs uppercase">
                {{ categories.join(' & ') }}
            </p>
            <h1
                class="item-highlight break-words font-bold leading-[18px] text-[14.4px] text-black"
            >
                {{ name }}
            </h1>

        </div>
        <footer>
            <p class="flex items-center my-3.5 text-black">
                <span class="item-em font-semibold text-search-icon text-xs flex items-center">
                    $
                </span>
                <strong class="text-sm ml-1">{{ price.toFixed(2) }}</strong>
                <span
                    class="item-em item-rating border border-yellow-500 flex font-semibold items-center ml-1 px-1 rounded-md text-search-icon text-[11px]"
                >
                    <StarIcon />
                    {{ rating }}
                </span>

                <span v-if="free_shipping" class="group w-1 h-1 text-sm mb-7 ml-12">
                    <FreeShippingIcon />
                </span>
            </p>

            <!-- View More Button -->
            <button
                @click="toggleModal"
                class="w-full bg-white text-black text-xs py-2 rounded-lg hover:bg-yellow-500 transition-all duration-200 flex justify-center"
            >
                <img class="h-3 mt-1 w-3 transition-transform z-1" src="/images/toggle-icon.svg" />
                View more
            </button>
        </footer>
    </article>

    <!-- Modal for product details -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-[90%] md:w-[50%] relative">
            <!-- Close Button -->
            <button @click="toggleModal" class="absolute top-2 right-2 text-black">
                &#10005;
            </button>

            <!-- Modal Content -->
            <div class="modal-content text-black">
                <header class="flex items-center">
                    <img class="object-cover w-24 h-24 mr-4" :src="image" :alt="name" />
                    <div>
                        <h1 class="font-bold text-xl">{{ name }}</h1>
                        <p class="text-sm text-gray-500">{{ categories.join(' & ') }}</p>
                        <p class="text-lg font-semibold text-black">Price: ${{ price.toFixed(2) }}</p>
                        <span
                            class="flex items-center mt-2 border border-yellow-500 px-2 py-1 rounded-md text-xs text-yellow-500"
                        >
                            <StarIcon class="mr-1" />
                            Rating: {{ rating }}
                        </span>
                    </div>
                </header>

                <p class="my-4 text-sm">{{ description }}</p>

                <!-- Add to Cart button inside modal -->
                <button
                    @click="addToCart"
                    class="w-full bg-yellow-500 text-white text-xs py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-content {
    max-height: 80vh;
    overflow-y: auto;
}
</style>
