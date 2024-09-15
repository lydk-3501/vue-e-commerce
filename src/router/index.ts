import { createRouter, createWebHistory } from 'vue-router'

import SearchView from '../views/SearchView.vue'
import CartView from '../views/CartView.vue'

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
        }
    ]
})

export default router
