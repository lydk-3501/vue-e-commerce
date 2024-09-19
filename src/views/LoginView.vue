<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/store/cartStore'
export default defineComponent({
    name: 'LoginView',
    setup() {
        const { t } = useI18n()
        const email = ref('')
        const password = ref('')
        const errors = ref<{ email?: string; password?: string }>({})
        const router = useRouter()
        const cartStore = useCartStore()

        const validate = () => {
            errors.value = {}
            let valid = true

            if (!email.value) {
                errors.value.email = 'Email is required'
                valid = false
            } else if (!/\S+@\S+\.\S+/.test(email.value)) {
                errors.value.email = 'Email is invalid'
                valid = false
            }

            if (!password.value) {
                errors.value.password = 'Password is required'
                valid = false
            }

            return valid
        }

        const handleSubmit = () => {
            if (validate()) {
                router.push({ name: 'search' })
                cartStore.setLoginFlag(true)
            }
        }

        return {
            t,
            email,
            password,
            errors,
            handleSubmit
        }
    }
})
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-2xl font-semibold mb-6 text-center text-black">{{ t('login') }}</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">{{
                        t('email')
                    }}</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        :class="{ 'border-red-500': errors.email }"
                        class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
                        placeholder="you@example.com"
                    />
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">{{
                        t('password')
                    }}</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        :class="{ 'border-red-500': errors.password }"
                        class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
                        placeholder="••••••••"
                    />
                    <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                        {{ errors.password }}
                    </p>
                </div>
                <div>
                    <button
                        type="submit"
                        class="w-full py-2 px-4 bg-gray-200 text-black rounded-md hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 font-semibold"
                    >
                        {{ t('login') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
