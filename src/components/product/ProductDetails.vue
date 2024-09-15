<script lang="ts">
import { defineComponent, ref } from 'vue'
import StarIcon from '../icons/IconStar.vue'
import NotiToast from '../notification/NotiToast.vue'
import { useCartStore } from '@/store/cartStore'

export default defineComponent({
    components: {
        StarIcon,
        NotiToast
    },
    props: {
        visible: { type: Boolean, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        categories: { type: Array as () => string[], required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        image: { type: String, required: true }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const quantity = ref(1)
        const showNotification = ref(false)
        const notificationMessage = ref('')

        // Access the cart store
        const cartStore = useCartStore()

        const toggleModal = () => {
            emit('close')
        }

        const incrementQuantity = () => {
            quantity.value++
        }

        const decrementQuantity = () => {
            if (quantity.value > 1) quantity.value--
        }

        const addToCart = () => {
            // Prepare the product data
            const product = {
                name: props.name,
                categories: props.categories,
                price: props.price,
                image: props.image,
                quantity: quantity.value
            }

            // Add product to cart store
            cartStore.addProductToCart(product)

            // Set notification message
            notificationMessage.value = 'Product added to cart successfully!' // Example message
            showNotification.value = true

            // Hide notification after 3 seconds
            setTimeout(() => {
                showNotification.value = false
            }, 3000)

            // Optionally close the modal
            toggleModal()
        }

        return {
            quantity,
            toggleModal,
            incrementQuantity,
            decrementQuantity,
            addToCart,
            showNotification,
            notificationMessage
        }
    }
})
</script>

<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
        <div class="bg-white p-6 rounded-lg w-full h-3/4 md:w-2/3 md:h-2/3 relative">
            <button @click="toggleModal" class="absolute top-2 right-2 text-black">&#10005;</button>

            <div
                class="modal-content max-h-[80vh] overflow-y-auto text-black grid grid-cols-2 gap-4"
            >
                <div class="flex justify-center items-center">
                    <img class="object-cover w-3/4" :src="image" :alt="name" />
                </div>

                <div class="p-4">
                    <header class="flex flex-col">
                        <h1 class="font-bold text-xl">{{ name }}</h1>
                        <p class="text-sm text-gray-500">{{ categories.join(' & ') }}</p>
                        <div class="flex justify-between">
                            <p class="text-lg font-semibold text-black">
                                Price: ${{ price.toFixed(2) }}
                            </p>
                            <span
                                class="flex items-center mt-2 px-2 py-1 rounded-md text-yellow-500 text-xl"
                            >
                                <StarIcon class="mr-1" />{{ rating }}</span
                            >
                        </div>
                    </header>

                    <p class="my-4 text-sm text-justify">{{ description }}</p>

                    <div class="mb-4 flex items-center">
                        <label for="quantity" class="text-sm font-semibold mr-4">Quantity:</label>
                        <div class="flex items-center">
                            <button
                                @click="decrementQuantity"
                                class="px-3 py-1 text-gray-700 rounded-l-md"
                                :disabled="quantity <= 1"
                            >
                                -
                            </button>

                            <input
                                id="quantity"
                                type="text"
                                v-model="quantity"
                                class="w-12 text-center border border-gray-300"
                                readonly
                            />

                            <button
                                @click="incrementQuantity"
                                class="px-3 py-1 text-gray-700 rounded-r-md"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        @click="addToCart"
                        class="w-full bg-yellow-500 text-white text-xs py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>

        <!-- Notification -->
        <NotiToast v-if="showNotification" :message="notificationMessage" />
    </div>
</template>
