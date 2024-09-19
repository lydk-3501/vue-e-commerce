import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '@/store/cartStore'
import { useToast } from 'vue-toastification'
import SearchView from '../views/SearchView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'search',
            component: SearchView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
})

router.beforeEach((to, from, next) => {
    const cartStore = useCartStore()
    const toast = useToast()

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!cartStore.isLogin) {
            toast.warning('Bạn cần phải đăng nhập để truy cập vào giỏ hàng.')
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
