<template>
    <div class="w-[400px] mx-auto">
        <previewCompProfile :profile="store.profile" :props="props" />
        <previewCompLinks :listLinks="store.links" :previewPage="previewPage" />
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

definePageMeta({
    layout: 'main'
})

const store = useLinksStore();
const previewPage = ref(true)

const route = useRoute()

const props = ref({
    width: "6rem",
    placeholderHeight: "1rem",
    gap: ".4rem",
})
</script>