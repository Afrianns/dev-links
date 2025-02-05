<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="w-[760px] h-[400px] bg-white shadow m-auto rounded-md border border-gray-50 overflow-hidden">
            <div class="flex h-full">
                <section
                    class="w-7/12 bg-cover bg-center bg-[url(assets/images/person-with-computer.jpg)] bg-no-repeat bg-gray-100">
                </section>
                <section class="w-5/12 p-5 font-red-hat flex flex-col justify-center">
                    <h1 class="text-xl mb-3 font-semibold text-center">Login</h1>
                    <form v-on:submit.prevent="authLogin">
                        <label class="font-light text-sm text-gray-700" for="name">Name</label> <br>
                        <input v-model="email"
                            class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm" type="text"
                            name="name" id="name" placeholder="E.g. Simon@gmail.com"> <br>

                        <label class="font-light text-sm text-gray-700" for="password">Password</label> <br>
                        <input v-model="password"
                            class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3 text-sm"
                            type="password" name="password" id="password" placeholder="Enter your password!"> <br>
                        <button v-if="!loading" type="submit"
                            class="login-btn-styles bg-orange-400 hover:bg-orange-300">Login</button>
                        <span v-if="loading"
                            class="login-btn-styles bg-orange-300 cursor-not-allowed flex items-center justify-center">
                            <Icon name="line-md:loading-twotone-loop" size="1.1rem" />
                        </span>

                        <span class="relative block my-3 font-light text-xs text-gray-500">
                            <hr class="absolute w-full bottom-[7px] border border-gray-200">
                            <p class="relative bg-white mx-auto z-10 px-2 w-fit">
                                or
                            </p>
                        </span>
                        <a href="#"
                            class="text-center block font-light text-sm text-gray-600 hover:underline">Register</a>
                    </form>
                    <div v-if="isError"
                        class="bg-red-200 text-red-500 py-2 flex gap-x-2 justify-center items-center text-center px-5 mt-5 rounded-md text-sm">
                        <Icon name="material-symbols:info" size="1.5rem" />
                        <p class="font-medium"> {{ errorMessage }}</p>
                    </div>
                </section>
            </div>
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