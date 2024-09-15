import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartProductProps {
    name: string
    categories: string[]
    price: number
    image: string
    quantity: number
}

export const useCartStore = defineStore('cart', () => {
    const cartProducts = ref<CartProductProps[]>([])
    const tempProduct = ref<CartProductProps | null>(null)

    const addProductToCart = (product: CartProductProps) => {
        tempProduct.value = product

        setTimeout(() => {
            if (tempProduct.value) {
                const existingProduct = cartProducts.value.find(
                    (item) => item.name === tempProduct.value!.name
                )
                if (existingProduct) {
                    existingProduct.quantity += tempProduct.value!.quantity
                } else {
                    cartProducts.value.push({ ...tempProduct.value!, quantity: 1 })
                }
                tempProduct.value = null // Clear temporary product
            }
        }, 500) // Delay for demo purposes
    }

    // Remove product from cart
    const removeProductFromCart = (productName: string) => {
        const index = cartProducts.value.findIndex((item) => item.name === productName)
        if (index !== -1) {
            cartProducts.value.splice(index, 1)
        }
    }

    // Update product quantity
    const updateProductQuantity = (productName: string, quantity: number) => {
        const product = cartProducts.value.find((item) => item.name === productName)
        if (product) {
            product.quantity = quantity
        }
    }

    // Get total price of the cart
    const cartTotal = computed(() => {
        return cartProducts.value.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        )
    })

    // Get total number of items in cart
    const cartItemCount = computed(() => {
        return cartProducts.value.reduce((count, product) => count + product.quantity, 0)
    })

    return {
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
        cartTotal,
        cartItemCount,
        tempProduct // Expose temporary product
    }
})
