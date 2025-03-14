<template>
    <div class="w-screen max-w-[400px] px-2 md:mx-auto">
        <previewCompProfile :profile="store.profile" :props="props" />
        <previewCompLinks  :listLinks="store.links" :previewPage="previewPage" />
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

const store = useLinksStore()
const previewPage = ref(true)

definePageMeta({
    layout: 'main'
})

// setting for reuseable component "previewComp" 
const props = ref({
    width: "6rem",
    placeholderHeight: "1rem",
    gap: ".4rem",
    marginTop: '1.2rem',
    nameStyles: true
})
</script>