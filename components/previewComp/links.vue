<template>
    <div class="flex flex-col gap-y-3 text-white">
        <div v-for="(link, idx) in listLinks">
            <a v-if="previewPage && checkListLinksExist(link)" :href="link?.link" target="_blank"
                :class="link.color + ' url-link-styles'" :key="idx">
                <PreviewCompLinksDetail :link="link" />
            </a>
            <span v-if="!previewPage" :class="link.color + ' url-link-styles'" :key="idx">
                <PreviewCompLinksDetail :link="link" />
            </span>
        </div>
        <div v-if="listLinks.length <= 0 && !previewPage" class="flex flex-col gap-y-3">
            <span class="animate-pulse url-link-styles bg-gray-300" v-for="i in sum" :key="i">
                <p class="h-6"></p>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';


const store = useLinksStore();

defineProps(['listLinks', 'previewPage'])

const sum = 2

const checkListLinksExist = (link: linksType) => {
    return (link.link && link.platform && link.platform && link.color && link.icon)
}

interface linksType {
    id?: string;
    user_id: string;
    code?: string;
    icon?: string;
    link?: string;
    color: string;
    platform?: string;
    created_at?: string;
}
</script>