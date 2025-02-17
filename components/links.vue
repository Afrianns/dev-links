<template>
    <div class="bg-zinc-100 p-3 rounded w-full h-fit mt-3">
        <div class="flex items-center justify-between">
            <h3 class="flex gap-x-1 items-center font-medium">
                Link {{ index + 1 }}
            </h3>
            <span v-on:click="$emit('remove-link', index, uuid)"
                class="cursor-pointer hover:underline py-1 px-2 hover:bg-red-100 text-red-500 rounded">Remove</span>
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
                <input v-model="link" type="url" name="link" id="link"
                    placeholder="Write the correct url, e.g. https://example.com"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <span class="mt-3 text-red-500" v-if="validURLMessage">{{ validURLMessage }}</span>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

const emit = defineEmits(['remove-link', 'platform', 'link'])

let { index, uuid } = defineProps(['index', 'uuid'])

const { links } = useLinksStore();

let selected = ref<string>('default');
let link = ref('');

let validURLMessage = ref("")

// Abbrivation different platform
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

// reactive "selected" platform to preview page
watch(selected, async (newPlatform, _) => {
    emit('platform', newPlatform, index);
})


// reactive check input url is valid or not
watch(link, async (newInput, _) => {
    const regexValidURL = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'ig')

    if (regexValidURL.test(newInput)) {
        emit('link', newInput, index);
        validURLMessage.value = ''
    } else {
        validURLMessage.value = "Url is not valid"
    }

})

// prevent data to gone / make it presistent. by initialized with "onMounted" and get data from pinia store
onMounted(() => {
    if (links[index].code) selected.value = links[index].code;
    if (links[index].link) link.value = links[index].link;
})

</script>
<style lang="">

</style>