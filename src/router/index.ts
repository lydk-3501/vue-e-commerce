import { createRouter, createWebHistory } from 'vue-router'

import SearchView from '../views/SearchView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '@/views/LoginVIew.vue'

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
            component: CartView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
})

export default router
