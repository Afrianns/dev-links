<template>
    <div class="flex flex-col gap-y-3 text-white">
        <div v-for="(link, idx) in listLinks">
            <a v-if="previewPage && link?.link" :href="link?.link" target="_blank"
                :class="link.color + ' url-link-styles'" :key="idx">
                <PreviewCompLinksDetail :link="link" />
            </a>
            <span v-if="!previewPage || previewPage && !link?.link" :class="link.color + ' url-link-styles'" :key="idx">
                <PreviewCompLinksDetail :link="link" />
            </span>
        </div>
        <div v-if="listLinks.length <= 0" class="flex flex-col gap-y-3">
            <span class="animate-pulse url-link-styles bg-gray-300" v-for="i in sum" :key="i">
                <p class="h-6"></p>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps(['listLinks', 'previewPage'])

const sum = 2

</script>