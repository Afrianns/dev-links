<template>
    <div>
        <h1 class="text-xl font-semibold text-center mt-2">Register</h1>
        <form v-on:submit.prevent="registerUser" class="relative">
            <label class="font-light text-sm text-gray-700" for="name">Username</label> <br>
            <input v-model="username" class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 text-sm mb-3"
                type="text" name="name" id="name" placeholder="Type your username..."> <br>
            <label class="font-light text-sm text-gray-700" for="email">Email</label> <br>
            <input v-model="email" class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm"
                type="text" name="email" id="email" placeholder="E.g. Simon@gmail.com"> <br>
            <label class="font-light text-sm text-gray-700" for="password">Password</label> <br>
            <input v-model="password" class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm"
                type="password" name="password" id="password" placeholder="Type your password..."> <br>
            <label class="font-light text-sm text-gray-700" for="password">Repeated Password</label> <br>
            <input v-model="repeatedPassword"
                class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm" type="password"
                name="repeated-password" id="repeated-password" placeholder="Type your password again..."> <br>
            <button v-if="!loading" type="submit"
                class="auth-btn-styles bg-orange-400 hover:bg-orange-300">Register</button>
            <span v-if="loading"
                class="auth-btn-styles bg-orange-300 cursor-not-allowed flex items-center justify-center">
                <Icon name="line-md:loading-twotone-loop" size="1rem" />
            </span>

            <span class="relative block my-3 font-light text-xs text-gray-500">
                <hr class="absolute w-full bottom-[7px] border border-gray-200">
                <p class="relative bg-white mx-auto z-10 px-2 w-fit">
                    or
                </p>
            </span>
            <div class="flex justify-center">
                <nuxt-link to="/" class="block font-light text-sm text-gray-600 hover:underline w-fit">Login</nuxt-link>
            </div>
        </form>
        <div v-if="isError" class="bg-red-200 text-red-500 py-2 flex gap-x-2 items-center px-5 rounded-md text-sm mt-5">
            <Icon name="material-symbols:info" size="1.5rem" />
            <p class="font-medium"> {{ errorMessage }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">

import type { Database } from '~/types/supabase'

definePageMeta({
    layout: "frontpage"
})

const supabase = useSupabaseClient<Database>()

const username = ref('')
const email = ref('')
const password = ref('')
const repeatedPassword = ref('')

const errorMessage = ref("There is an error occurs")

const isError = ref(false)
const loading = ref(false)

// function registering current user data
const registerUser = async () => {

    if (password.value !== repeatedPassword.value) {
        errorMessage.value = "password doesn't match with each other"
        isError.value = true
        return
    }

    loading.value = true

    const user = await supabase.auth.signUp(
        {
            email: email.value,
            password: password.value,
            options: {
                data: {
                    username: username.value,
                    email: email.value
                }
            }
        }
    )

    if (user.error) {
        errorMessage.value = (user.error?.message == 'Database error saving new user') ? `Username ${username.value} already been used!` : user.error?.message
        isError.value = true
    }

    loading.value = false

    if (user.data.user) return navigateTo('/links')

}

</script>