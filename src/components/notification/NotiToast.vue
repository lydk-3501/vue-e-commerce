<!-- components/Notification.vue -->
<template>
    <div v-if="visible" class="fixed top-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg">
        {{ message }}
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        message: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 3000 // default duration: 3 seconds
        }
    },
    setup(props) {
        const visible = ref(true)

        setTimeout(() => {
            visible.value = false
        }, props.duration)

        return {
            visible
        }
    }
})
</script>
