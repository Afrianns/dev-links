<template>
    <div class="mb-8 mt-14 flex flex-col" :style="'gap:' + props.gap">
        <section>
            <div class="rounded-full bg-gray-300 mx-auto bg-no-repeat bg-center overflow-hidden bg-cover"
                :style="'background-image: url(' + [profile.profileData ? profile.profileData : ''] + ');  width: ' + props.width + '; height:' + props.width"
                :class="[profile.profileData ? '' : 'animate-pulse']">
            </div>
        </section>
        <section class="leading-3" :style="'margin-top: ' + props.marginTop">
            <p v-if="!profile.firstName && !profile.lastName"
                class="px-5 bg-gray-300 w-1/2 rounded-md mt-3 mx-auto animate-pulse"
                :style="'height: ' + props.placeholderHeight">
            </p>
            <h1 class="text-md text-gray-700 mx-auto w-fit" :class="{ 'text-2xl font-semibold': props.nameStyles }"
                v-if="profile.firstName || profile.lastName"> {{
                    profile.firstName
                }} {{ profile.lastName }}
            </h1>
        </section>
        <section>
            <p v-if="!profile.email" class="px-5 bg-gray-300 w-1/3 rounded-md mt-2 mx-auto animate-pulse"
                :style="'height: ' + props.placeholderHeight">
            </p>
            <p v-if="profile.email" class="text-sm font-normal text-gray-500 mx-auto w-fit"> {{ profile.email }}
            </p>
        </section>
    </div>
</template>
<script setup lang="ts">

defineProps(['profile', 'props']);

</script>