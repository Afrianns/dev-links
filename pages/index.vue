<template>
    <div>
        <h1 class="text-xl mb-3 font-semibold text-center">Login</h1>
        <form v-on:submit.prevent="authLogin">
            <label class="font-light text-sm text-gray-700" for="email">Email</label> <br>
            <input v-model="email" class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm"
                type="text" name="email" id="email" placeholder="E.g. Simon@gmail.com"> <br>

            <label class="font-light text-sm text-gray-700" for="password">Password</label> <br>
            <input v-model="password" class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm"
                type="password" name="password" id="password" placeholder="Type your password..."> <br>
            <button v-if="!loading" type="submit"
                class="auth-btn-styles bg-orange-400 hover:bg-orange-300">Login</button>
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
                <nuxt-link to="/register"
                    class="block font-light text-sm text-gray-600 hover:underline w-fit">Register</nuxt-link>
            </div>
        </form>
        <div v-if="isError"
            class="bg-red-200 text-red-500 py-2 flex gap-x-2 justify-center items-center text-center px-5 mt-5 rounded-md text-sm">
            <Icon name="material-symbols:info" size="1.5rem" />
            <p class="font-medium"> {{ errorMessage }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">

const email = ref('')
const password = ref('')

const errorMessage = ref("There is an error occurs")

const isError = ref(false)
const loading = ref(false)

const supabase = useSupabaseClient()

definePageMeta({
    layout: 'frontpage'
})

const getUser = async () => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })

        if (data.user) {
            return navigateTo('/links')
        } else {
            isError.value = true

            if (error) errorMessage.value = error?.message

            throw new Error(error?.message)
        }

    } catch (error) {
        console.log(error);
    }

    loading.value = false
}

const authLogin = () => {
    console.log(email.value, password.value);
    loading.value = true;
    getUser()
}

</script>