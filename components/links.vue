<template>
    <div class="bg-zinc-100 p-3 rounded w-full h-fit mt-3">
        <div class="flex items-center justify-between">
            <h3 class="flex gap-x-1 items-center font-medium py-1 px-2 hover:bg-zinc-200 rounded cursor-pointer w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M7 19v-2h2v2zm4 0v-2h2v2zm4 0v-2h2v2zm-8-4v-2h2v2zm4 0v-2h2v2zm4 0v-2h2v2zm-8-4V9h2v2zm4 0V9h2v2zm4 0V9h2v2zM7 7V5h2v2zm4 0V5h2v2zm4 0V5h2v2z" />
                </svg>
                Link #{{ index + 1 }}
            </h3>
            <span v-on:click="$emit('remove-link', index)" class="cursor-pointer hover:underline">Remove</span>
        </div>

        <div class="mt-5">
            <form class="w-full">
                <label for="platform" class="block mb-2 text-sm font-medium">Platform</label>
                <select id="platform" v-model="selected"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="default" class="font-medium">Choose a platform</option>
                    <option v-for="platform in platforms" :value="platform.id">{{
                        platform.name }}</option>
                </select>

                <label for="link" class="block mt-3 text-sm font-medium">Link</label>
                <input v-model="link" type="url" name="link" id="link" placeholder="Write the correct url"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

const emit = defineEmits(['remove-link', 'platform', 'link'])

let { index } = defineProps(['index'])

const { links } = useLinksStore();

let selected = ref('default');
let link = ref('');

interface reversePlatformsType {
    [key: string]: { name: string }
}

const platforms = [
    {
        "id": "PW",
        "name": "Person Website",
    },
    {
        "id": "GH",
        "name": "Github"
    },
    {
        "id": "CW",
        "name": "Codewars"
    },
    {
        "id": "LC",
        "name": "Leetcode"
    },
    {
        "id": "HR",
        "name": "Hackerrank"
    }
];

const reversePlatforms: reversePlatformsType = {
    "Person Website": { name: "PW" },
    "Github": { name: "GH" },
    "Codewars": { name: "CW" },
    "Leetcode": { name: "LC" },
    "Hackerrank": { name: "HR" },
    "Undefined": { name: "Default" }
}


watch(selected, async (newPlatform, _) => {
    emit('platform', newPlatform, index);
})


watch(link, async (newInput, _) => {
    emit('link', newInput, index);
})

onMounted(() => {
    if (links[index].platform) selected.value = reversePlatforms[links[index].platform || 'Undefined'].name;
    if (links[index].link) link.value = links[index].link;
})

</script>
<style lang="">

</style>