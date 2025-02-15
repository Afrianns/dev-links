<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})
</script>

<template>
    <main class="h-full flex justify-center align-middle flex-col text-center text-gray-700">
        <div>
            <h1 class="font-black text-8xl">{{ props.error?.statusCode }}</h1>
            <h2 class="font-semibold text-lg">{{ props.error?.statusMessage }}</h2>
            <span class="mt-2 font-thin text-sm">parameter url name: {{ props.error?.data }}</span>
            <p class="mt-3 font-light text-red-500">~{{ props.error?.message }}~</p>
        </div>
        <NuxtLink to="/" class="mt-10 text-blue-400 hover:text-blue-600 hover:underline cursor-pointer">Go home
        </NuxtLink>
    </main>
</template>
