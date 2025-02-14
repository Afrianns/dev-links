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
            </div>
            <div class="h-3/4 px-4 w-full overflow-y-auto pb-16">
                <div>
                    <div v-if="store.links.length > 0">
                        <links v-for="(link, idx) in store.links" :index="idx" :uuid="link?.id" :key="link.id"
                            @remove-link="removeLink" @platform="setUpdateLink" @link="setLink" />
                    </div>

                    <div class="py-10" v-if="store.links.length <= 0">
                        <img src="assets/vectors/no-data.svg" class="w-1/4 mx-auto" alt="no data flat illustration">
                        <h3 class="text-center mt-5 text-gray-500">There is no Links Provided</h3>
                    </div>
                </div>
            </div>
            <div v-if="store.links.length > 0"
                class="absolute bottom-0 bg-white w-full h-16 rounded-b-md border-t border-gray-200 flex items-center justify-end gap-x-3">
                <div v-if="isError"
                    class="bg-red-200 text-red-500 py-2 px-10 flex gap-x-2 items-center rounded-lg text-sm">
                    <Icon name="material-symbols:info" size="1.5rem" />
                    <p class="font-medium"> {{ errorMessage }}</p>
                </div>

                <span v-if="saveLoading"
                    class="text-white w-fit bg-blue-300 cursor-not-allowed flex items-center justify-center rounded-lg py-2 px-10 mr-5">
                    <Icon name="line-md:loading-twotone-loop" size="1.5rem" />
                </span>
                <button v-if="!saveLoading" @click="saveData"
                    class="py-2 px-10 bg-blue-500 rounded-lg text-white mr-5 hover:bg-blue-600">Save</button>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">

import type { Database } from '~/types/supabase'
import { useLinksStore } from '~/store/LinksStore'

type platformsDataType = {
    code: string,
    name: string,
    icon: string,
    color: string,
}

type platformsType = {
    [key: string]: platformsDataType,
}

interface linksType {
    code?: string | null;
    color?: string | null;
    created_at?: string | null;
    icon?: string | null;
    id?: string;
    link?: string | null;
    platform?: string | null;
    user_id?: string;
}

const store = useLinksStore()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const userId = ref<string | undefined>("")

const saveLoading = ref(false)
const errorMessage = ref('there is an testing')
const isError = ref(false)

// let idx = ref<number>(0);
// let listLinks = ref<linkObj[]>([]);

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
const removeLink = async (index: number, uuid: string) => {
    store.links.splice(index, 1);

    if (uuid) {
        const response = await supabase
            .from('Links')
            .delete()
            .eq('id', uuid)

        console.log(response)
    }

}

const addNewLink = () => {
    store.links.push({
        "user_id": userId.value,
        "color": "bg-gray-300",
    });
    console.log(store.links)
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

const saveData = async () => {
    saveLoading.value = true
    console.log(userId.value, store.links)
    const { data, error } = await supabase
        .from('Links')
        .upsert(store.links, { defaultToNull: false })
        .select()

    if (error) {
        errorMessage.value = error.message;
        isError.value = true;
    }
    if (data) {
        store.links = data as linksType[]
    }

    saveLoading.value = false
}


onMounted(() => {
    userId.value = user.value?.id;
    console.log(typeof user.value?.id, typeof userId.value)
})

</script>