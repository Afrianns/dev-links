<template>
    <div v-if="link?.platform" class="flex items-center gap-x-1 font-medium">
        <Icon v-if="link.icon" :name="link.icon" size="1.5rem" />
        {{ link?.platform }}
    </div>
    <div v-else class="flex items-center gap-x-2">
        <p class="font-medium" :class="{ 'text-gray-100': link?.platform, 'text-gray-500': !link?.platform }">No
            Link
        </p>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15">
        <path :class="{ 'fill-white': link?.platform, 'fill-gray-400': !link?.platform }"
            d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
    </svg>
</template>
<script setup lang="ts">
defineProps(['link'])
</script>