<script lang="ts">
export default {
    name: 'StarIcon',
    props: {
        width: {
            type: String,
            default: 'w-2'
        },
        height: {
            type: String,
            default: 'h-2'
        },
        color: {
            type: String,
            default: 'text-yellow-500'
        }
    }
}
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="[width, height, color]"
        viewBox="0 0 16 16"
        fill="currentColor"
    >
        <path
            fill-rule="evenodd"
            d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
        />
    </svg>
</template>
