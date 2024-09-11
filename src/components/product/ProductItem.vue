<script lang="ts">
import { defineComponent } from 'vue'

import StarIcon from '../icons/IconStar.vue'

export default defineComponent({
    components: {
        StarIcon
    },
    props: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        categories: { type: Array<String>, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        image: { type: String, required: true }
    },
    setup() {
        const truncateText = (text: string, maxLength: number) => {
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
        }
        return {
            truncateText
        }
    }
})
</script>

<template>
    <article
        class="item rounded-lg duration-300 hover:shadow-lg hover:scale-105 max-w-56 min-w-[175px] px-4 transition-all"
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
            <a class="item-description break-words mb-3 text-sm text-gray-900">
                {{ truncateText(description, 100) }}
            </a>
            <span
                class="item-tooltip absolute bg-gray-200 group-hover:block hidden ml-32 left-full bottom-0 p-4 rounded-lg text-justify transform -translate-x-1/2 text-black text-xs w-60 z-1"
            >
                {{ description }}
                <span
                    class="absolute top-8 -left-1 transform -translate-x-1/2 -translate-y-full w-1 h-1 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-200 -rotate-90"
                ></span>
            </span>
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
            </p>
        </footer>
    </article>
</template>
