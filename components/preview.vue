<template>
    <section class="bg-white w-1/3 h-[600px] rounded-md py-10 px-2 border border-slate-200 shadow-sm flex items-center">
        <div
            class="h-[470px] w-5/6 bg-contain mx-auto bg-center bg-[url(assets/images/mobile-frame.png)] rounded-3xl bg-no-repeat bg-gray-50 relative px-4 overflow-y-auto">
            <previewCompProfile :profile="store.profile" :props="props" />
            <previewCompLinks :listLinks="store.links" :previewPage="previewPage" />
        </div>
    </section>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

const previewPage = ref(false)
const props = ref({
    width: "4rem",
    gap: ".2rem",
    placeholderHeight: ".75rem",
})
const store = useLinksStore();

</script>