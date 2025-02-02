<template>
    <div class="flex justify-center w-[1000px] mx-auto mb-10">
        <preview />
        <section class="w-2/3 bg-white h-[600px] rounded-md py-3 border border-slate-200 shadow-sm ml-5 relative">
            <div class="p-3 mx-2 pb-20 overflow-y-auto h-full">
                <div class="my-3 mb-7">
                    <h2 class="font-semibold text-xl">
                        Profile Details
                    </h2>
                    <p class="text-gray-500">Create/Update your profile details all you want and showcase to everyone!
                    </p>
                </div>
                <div class="w-full h-48 bg-gray-100 rounded-md text-gray-400 text-sm">
                    <label for="avatar" class="w-full h-full grid grid-cols-3 gap-4 px-4  items-center rounded-md">

                        <input type="file" name="avatar" id="avatar" v-on:change="getAvatar" hidden>
                        <div class="group bg-center w-full h-4/5 bg-cover rounded-md bg-no-repeat flex items-center relative overflow-hidden bg-gray-300"
                            :style="'background-image: url(' + [profile.profileData ? profile.profileData : '/avatars/placeholder.png'] + ')'">
                            <span class="bg-black/25 w-full h-full absolute group-hover:block hidden"></span>
                            <Icon name="lets-icons:img-box-fill"
                                class="w-2/3 h-2/3 mx-auto bg-white group-hover:block hidden cursor-pointer" />
                        </div>
                        <span class="w-full col-span-2">Image must be below 1024x1024px, <br> with PNG, JPG, or JPEG
                            format.</span>
                    </label>
                </div>

                <div class="p-2 bg-gray-100 mt-3">
                    <form action="" method="post">
                        <label for="first-name" class="block mt-3 text-sm font-medium">First Name</label>
                        <input v-model="firstName" name="first-name" id="first-name" placeholder="enter your first name"
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <label for="last-name" class="block mt-3 text-sm font-medium">Last Name</label>
                        <input v-model="lastName" name="last-name" id="last-name" placeholder="enter your last name"
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <label for="email" class="block mt-3 text-sm font-medium">Email</label>
                        <input v-model="email" name="email" id="email" placeholder="enter your active email"
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </form>
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

definePageMeta({
    layout: 'main'
})

let avatar = ref('')

import { useLinksStore } from '../../store/LinksStore'
const { profile } = useLinksStore();

let firstName = ref<string | undefined>('');
let lastName = ref<string | undefined>('');
let email = ref<string | undefined>('');

onMounted(() => {
    if (profile.firstName) firstName.value = profile.firstName
    if (profile.lastName) lastName.value = profile.lastName
    if (profile.email) email.value = profile.email
})

// watch for individual profile data, 
// make 3 watches for delete work when reach 1-0 letters of words otherwise data wont reactive

watch(() => firstName.value, (firstName) => profile.firstName = firstName)

watch(() => lastName.value, (lastName) => profile.lastName = lastName)

watch(() => email.value, (email) => profile.email = email)


const getAvatar = (a: any) => {
    profile.profileData = URL.createObjectURL(a.target.files[0])
    if (profile.profileData) avatar.value = profile.profileData
}
</script>