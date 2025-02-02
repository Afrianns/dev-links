<template>
    <section class="bg-white w-1/3 h-[600px] rounded-md py-10 px-2 border border-slate-200 shadow-sm flex items-center">
        <div
            class="h-[470px] w-5/6 bg-contain mx-auto bg-center bg-[url(assets/images/mobile-frame.png)] rounded-3xl bg-no-repeat bg-gray-50 relative px-4 overflow-y-auto">
            <div class="mb-6 mt-14">
                <section>
                    <div class="w-16 h-16 rounded-full bg-gray-200 mx-auto bg-no-repeat bg-center overflow-hidden bg-cover"
                        :style="'background-image: url(' + [profile.profileData ? profile.profileData : ''] + ')'"
                        :class="[profile.profileData ? '' : 'animate-pulse']">
                    </div>
                </section>
                <section>
                    <p v-if="!profile.firstName && !profile.lastName"
                        class="px-5 bg-gray-200 w-28 h-3 rounded-md mt-3 mx-auto animate-pulse"></p>
                    <h2 class="text-md text-gray-700 mx-auto w-fit" v-if="profile.firstName || profile.lastName"> {{
                        profile.firstName
                        }} {{ profile.lastName }}
                    </h2>
                </section>
                <section>
                    <p v-if="!profile.email" class="px-5 bg-gray-200 w-20 h-3 rounded-md mt-2 mx-auto animate-pulse">
                    </p>
                    <p v-if="profile.email" class="text-sm font-normal text-gray-500 mx-auto w-fit"> {{ profile.email }}
                    </p>
                </section>
            </div>
            <div class="flex flex-col gap-y-3 text-white">
                <span v-for="(link, idx) in listLinks"
                    :class="link.color + ' w-full h-fit py-2 px-3 rounded-md flex items-center justify-between'"
                    :key="idx">
                    <div v-if="link?.platform" class="flex items-center gap-x-1 font-medium">
                        <Icon v-if="link.icon" :name="link.icon" size="1.5rem" />
                        {{ link?.platform }}
                    </div>
                    <div v-else class="flex items-center gap-x-2">
                        <p class="font-medium"
                            :class="{ 'text-gray-100': link?.platform, 'text-gray-400': !link?.platform }">No Link
                        </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15">
                        <path :class="{ 'fill-white': link?.platform, 'fill-gray-400': !link?.platform }"
                            d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                    </svg>
                </span>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore';

const { profile, links: listLinks } = useLinksStore();
</script>