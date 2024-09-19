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
    const isLogin = ref<boolean>(false)

    const setLoginFlag = (flag: boolean) => {
        isLogin.value = flag
    }

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
                tempProduct.value = null
            }
        }, 500)
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

    const cartTotal = computed(() => {
        return cartProducts.value.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        )
    })

    const cartItemCount = computed(() => {
        return cartProducts.value.reduce((count, product) => count + product.quantity, 0)
    })

    return {
        isLogin,
        setLoginFlag,
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
        cartTotal,
        cartItemCount,
        tempProduct
    }
})
