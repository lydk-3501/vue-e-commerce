<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import StarIcon from '../icons/IconStar.vue'
import FreeShippingIcon from '../icons/IconFreeShipping.vue'
import ProductDetails from './ProductDetails.vue'

export default defineComponent({
    components: {
        StarIcon,
        FreeShippingIcon,
        ProductDetails
    },
    props: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        categories: { type: Array as () => string[], required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        image: { type: String, required: true },
        free_shipping: { type: Boolean, required: true },
        searchQuery: { type: String, default: '' }
    },
    setup(props) {
        const showModal = ref(false)
        const toggleModal = () => {
            showModal.value = !showModal.value
        }

        const highlightText = (text: string, query: string) => {
            if (!query) return text
            const regex = new RegExp(`(${query})`, 'gi')
            return text.replace(regex, '<mark>$1</mark>')
        }

        const highlightedName = computed(() => highlightText(props.name, props.searchQuery))
        const highlightedCategories = computed(() =>
            props.categories
                .map((category) => highlightText(category, props.searchQuery))
                .join(' & ')
        )

        return {
            showModal,
            toggleModal,
            highlightedName,
            highlightedCategories
        }
    }
})
</script>

<template>
    <article
        class="item rounded-lg duration-200 hover:shadow-lg hover:scale-105 max-w-3/4 mb-4 min-w-2/3 px-4 transition-all"
    >
        <header
            class="image-container items-center justify-center flex mx-3 max-w-[175px] h-[175px]"
        >
            <img class="object-cover" :src="image" :alt="name.replace(/-/g, ',')" />
        </header>
        <div class="info-container inline-block group">
            <p class="item-category font-semibold mb-2 mt-3 text-gray-500 text-xs uppercase">
                <span v-html="highlightedCategories"></span>
            </p>
            <h1
                class="item-highlight break-words font-bold leading-[18px] text-[14.4px] text-black"
                v-html="highlightedName.replace(/-/g, ',')"
            ></h1>
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

                <span v-if="free_shipping" class="group w-1 h-1 text-sm mb-7 ml-12">
                    <FreeShippingIcon />
                </span>
            </p>

            <button
                @click="toggleModal"
                class="w-full bg-white text-black text-xs py-2 rounded-lg hover:font-bold transition-all duration-200 flex justify-center"
            >
                <img class="h-3 mt-1 w-3 transition-transform z-1" src="/images/toggle-icon.svg" />
                View more
            </button>
        </footer>
    </article>

    <ProductDetails
        :visible="showModal"
        :name="name.replace(/-/g, ',')"
        :description="description"
        :categories="categories"
        :price="price"
        :rating="rating"
        :image="image"
        @close="toggleModal"
    />
</template>
