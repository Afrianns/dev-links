<template>
    <div class="w-[400px] mx-auto">
        <previewCompProfile :profile="profile" :props="props" />
        <previewCompLinks :listLinks="listLinks" :previewPage="previewPage" />
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

definePageMeta({
    layout: 'main'
})

const { profile, links: listLinks } = useLinksStore();
const previewPage = ref(true)

const route = useRoute()

const props = ref({
    width: "6rem",
    placeholderHeight: "1rem",
    gap: ".4rem",
})

</script>