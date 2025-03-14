<template>
    <div :class="{ '-top-20': !confirmEmailNotif, 'top-5': confirmEmailNotif }"
        class="transition-all delay-150 duration-300 ease-in-out bg-green-50 text-green-800 py-2 px-4 border-2 border-teal-500 shadow-green-200 rounded-xl shadow-md z-10 fixed left-1/2 transform -translate-x-1/2 flex gap-x-2 items-center">
        <Icon name="gg:check-o" size="20" class="bg-green-700 font-bold" />
        <h1>Email confirmation has sent!</h1>
    </div>
    <div class="flex justify-center md:w-[1000px] mx-auto mb-10">
        <preview class="hidden md:block" />
        <section class="md:w-2/3 bg-white h-[600px] rounded-md py-3 border border-slate-200 shadow-sm md:ml-5 relative">
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
                            :style="'background-image: url(' + [store.profile.profileData ? store.profile.profileData : '/avatars/placeholder.png'] + ')'">
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

                        <label for="url-name" class="block mt-3 text-sm font-medium">Url Name</label>
                        <input v-model="urlName" name="url-name" id="url-name"
                            placeholder="Enter your url name or your display name" class="input-styles mb-2"
                            :class="{ 'bg-gray-50 border-gray-300': !urlNameError, 'bg-red-50 border-red-300 placeholder-red-500': urlNameError }">

                        <span v-if="urlNameError" class="text-red-500 py-2">{{ urlNameError }}</span>
                        <label for="first-name" class="block mt-3 text-sm font-medium">First Name</label>
                        <input v-model="firstName" name="first-name" id="first-name" placeholder="enter your first name"
                            class="input-styles bg-gray-50 border-gray-300">

                        <label for="last-name" class="block mt-3 text-sm font-medium">Last Name</label>
                        <input v-model="lastName" name="last-name" id="last-name" placeholder="enter your last name"
                            class="input-styles bg-gray-50 border-gray-300">

                        <label for="email" class="block mt-3 text-sm font-medium">Email</label>
                        <input v-model="email" name="email" id="email" placeholder="enter your active email"
                            class="input-styles"
                            :class="{ 'bg-gray-50 border-gray-300': !emailError, 'bg-red-50 border-red-300 text-red-500 placeholder-red-500': emailError }">
                        <span class="text-sm font-light">Email need confirmation to change</span>
                        <span v-if="emailError" class="text-red-500 py-2">{{ emailError }}</span><br>
                    </form>
                </div>
            </div>
            <div
                class="absolute bottom-0 bg-white w-full h-16 rounded-b-md border-t border-gray-200 flex items-center justify-end">
                <span v-if="saveFailed"
                    class="mr-5 text-red-700 font-medium flex items-center gap-x-2 bg-red-50 rounded-2xl py-1 px-2 ">
                    <Icon name="rivet-icons:exclamation-mark-circle" size="20" /> {{ saveFailed }}
                </span>
                <span v-if="saveSuccess"
                    class="mr-5 text-green-700 font-medium flex items-center gap-x-2 bg-green-50 rounded-2xl py-1 px-2 ">
                    <Icon name="fluent:checkmark-circle-12-regular" size="20" /> {{ successMessage }}
                </span>

                <button v-if="!saveProfileLoading" @click="updateUser()"
                    class="bg- py-2 px-14 bg-blue-500 rounded-lg text-white mr-5 hover:bg-blue-600">Save</button>
                <span v-if="saveProfileLoading" class="bg- py-2 px-14 rounded-lg text-white mr-5 flex bg-blue-300 ">
                    <Icon name="line-md:loading-twotone-loop" size="24" class="bg-white" />
                </span>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">

import { useLinksStore } from '~/store/LinksStore'
const store = useLinksStore()
const supabase = useSupabaseClient()

const successMessage = ref("successfully saved")
let saveSuccess = ref(false)

definePageMeta({
    layout: 'main'
})

let avatar = ref('')

let urlName = ref<string | undefined>('')
let firstName = ref<string | null>('')
let lastName = ref<string | null>('')
let email = ref<string | undefined>('')

let profilePict = ref()

let urlNameError = ref('')
let emailError = ref('')

let saveFailed = ref('')

let confirmEmailNotif = ref(false)
let saveProfileLoading = ref(false)

// update current auth user w/ avatar uploading
const updateUser = async () => {
    // regex check email is valid or not
    const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')

    // start for loading boolean
    saveProfileLoading.value = true;

    if (profilePict.value) {
        const { error } = await supabase
            .storage
            .from('Profile Pictures')
            .update(`avatars/avatar_user${store.profile.id}`, profilePict.value, {
                cacheControl: '30',
                upsert: true
            })

        if (error) {
            saveProfileLoading.value = false
            return
        }
    }

    // Validate Url Name 
    if (!urlName.value) {
        urlNameError.value = "Url name cannot be empty!"
        saveProfileLoading.value = false
        return
    }
    // validate email is empty or not, and if is valid or not
    if (!email.value) {
        emailError.value = "Email cannot be empty!"
        saveProfileLoading.value = false
        return
    } else if (!regexEmail.test(email.value)) {
        emailError.value = "Email is not valid!"
        saveProfileLoading.value = false
        return
    }

    // if pass everthing above then
    // update new user data
    // first name and last name doesn't need to be filled nor validated
    const { data, error } = await supabase.auth.updateUser({
        email: email.value,
        data: {
            email: email.value,
            username: urlName.value,
            first_name: firstName.value,
            last_name: lastName.value,
        }
    })

    // if success update user and is email is getting update then show notif on the page
    if (data.user && store.profile.email != email.value) {
        confirmEmailNotif.value = true;
        setTimeout(() => confirmEmailNotif.value = false, 3400);
    }

    if (error) {
        console.log(error.message)
        saveFailed.value = error.message

        saveProfileLoading.value = false
        return
    }

    // reset error infos for url and email
    urlNameError.value = ''
    emailError.value = ''

    saveProfileLoading.value = false

    saveSuccess.value = true;
    setTimeout(() => saveSuccess.value = false, 3400)
}

// watch for individual profile data,
// make 3 watches for delete work when reach 1-0 letters of words otherwise data wont reactive

watch(() => firstName.value, (firstName) => store.profile.firstName = firstName)

watch(() => lastName.value, (lastName) => store.profile.lastName = lastName)

watch(() => email.value, (email) => store.profile.email = email)

watch(() => urlName.value, (urlName) => store.profile.urlName = urlName)

// get temp user avatar and create object url from blob
const getAvatar = (a: any) => {
    store.profile.profileData = URL.createObjectURL(a.target.files[0])
    if (store.profile.profileData)
        avatar.value = store.profile.profileData
    profilePict.value = a.target.files[0];
}

// initalized all pinia store data if exist
onUpdated(() => {
    if (store.profile.urlName) urlName.value = store.profile.urlName
    if (store.profile.firstName) firstName.value = store.profile.firstName
    if (store.profile.lastName) lastName.value = store.profile.lastName
    if (store.profile.email) email.value = store.profile.email

})
</script>