<template>
    <div class="flex justify-center w-[1000px] mx-auto mb-10">
        <preview />
        <section class="w-2/3 bg-white h-[600px] rounded-md py-3 border border-slate-200 shadow-sm ml-5 relative">
            <div class="p-3 mx-2">
                <div class="my-3 mb-7">
                    <h2 class="font-semibold text-xl">
                        Customized Your Links
                    </h2>
                    <p class="text-gray-500">Add/Remove/Edit links all you want and showcase to everyone!</p>
                </div>

                <button v-on:click="addNewLink"
                    class="w-full blue-btn flex justify-center items-center font-semibold py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" />
                    </svg> Add
                    New Links</button>

                <!-- <button @click="setCount">click me</button> -->
                <!-- <p>{{ store.links }}</p> -->
            </div>
            <div class="h-3/4 px-4 w-full overflow-y-auto pb-16">
                <div>
                    <div v-if="store.links.length > 0">
                        <links v-for="(link, idx) in store.links" :index="idx" :key="link.id" @remove-link="removeLink"
                            @platform="setUpdateLink" @link="setLink" />
                    </div>

                    <div class="py-10" v-if="store.links.length <= 0">
                        <img src="assets/vectors/no-data.svg" class="w-1/4 mx-auto" alt="no data flat illustration">
                        <h3 class="text-center mt-5 text-gray-500">There is no Links Provided</h3>
                    </div>
                </div>
            </div>
            <div
                class="absolute bottom-0 bg-white w-full h-16 rounded-b-md border-t border-gray-200 flex items-center justify-end">
                <button class="bg- py-2 px-14 bg-blue-500 rounded-lg text-white mr-5 hover:bg-blue-600">Save</button>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">

import { useLinksStore } from '../../store/LinksStore'

const store = useLinksStore();

type platformsDataType = {
    code: string,
    name: string,
    icon: string,
    color: string,
}

type platformsType = {
    [key: string]: platformsDataType,
}

type linkObj = {
    id: number,
    color?: string,
    icon?: string,
    platform?: string,
    link?: string,
}

let idx = ref<number>(0);
let listLinks = ref<linkObj[]>([]);

definePageMeta({
    layout: 'main'
})

const platforms: platformsType = {
    "PW": { code: "PW", name: "Person Website", icon: "mdi:earth", color: "bg-orange-500" },
    "GH": { code: "GH", name: "Github", icon: "mdi:github", color: "bg-gray-500" },
    "CW": { code: "CW", name: "Codewars", icon: "cib:codewars", color: "bg-red-500" },
    "LC": { code: "LC", name: "Leetcode", icon: "tabler:brand-leetcode", color: "bg-orange-500" },
    "HR": { code: "HR", name: "Hackerrank", icon: "cib:hackerrank", color: "bg-emerald-500" },
}

// simple-icons:frontendmentor
const removeLink = (val: number) => {
    listLinks.value.splice(val, 1);
    store.links.splice(val, 1);
}

const addNewLink = () => {
    idx.value = listLinks.value.length;

    store.links.push({
        "id": store.idx++,
        "color": "bg-gray-300",
    });
}

const setUpdateLink = (platform: string, index: number) => {
    if (platform != 'default') {
        store.links[index].platform = platforms[platform].name
        store.links[index].icon = platforms[platform].icon
        store.links[index].color = platforms[platform].color
        store.links[index].code = platforms[platform].code

    } else {
        store.links[index].color = "bg-gray-300"
        delete store.links[index].platform
        delete store.links[index].icon
    }
}

const setLink = (link: string, index: number) => {
    store.links[index].link = link
}

onMounted(() => {
    store.getLinks();
})

</script>