<template>

    <nav v-if="user"
        class="flex justify-between bg-white mx-auto py-5 px-10 rounded-md my-5 w-[1000px] border border-slate-200 shadow-sm items-center text-gray-700">
        <h1 class="flex items-center gap-3 font-bold text-blue-950"> <svg class="bg-blue-200 py-1 px-2 rounded-lg"
                xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20">
                <path fill="blue"
                    d="M17.74 2.76a4.32 4.32 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.32 4.32 0 0 1 6.1 0M8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0m-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.32 4.32 0 0 1-6.1 0a4.32 4.32 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0" />
            </svg> Dev Links</h1>
        <ul class="flex gap-5" v-if="checkParams(route.fullPath)">
            <li>
                <nuxt-link to="/links" activeClass="active-link" class="link-style">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m13.06 8.111l1.415 1.414a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415zm6.718 6.01l-1.414-1.414a5 5 0 0 0-7.071-7.07l-.354.353a5 5 0 0 0 0 7.07l1.415 1.415l-1.415 1.414l-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 1 1 9.9 9.9" />
                    </svg> Links
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/links/profile" activeClass="active-link" class="link-style">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                            <path
                                d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" />
                        </g>
                    </svg> Profile
                </nuxt-link>
            </li>
        </ul>
        <div class="flex gap-x-2">
            <div v-if="!loading" @click="logOut">
                <h2 class="red-btn">Logout
                </h2>
            </div>
            <div v-if="loading">
                <h2 class="red-btn opacity-55 flex items-center justify-center">
                    <Icon name="line-md:loading-twotone-loop" size="1.5rem" />
                </h2>
            </div>
            <div v-if="checkParams(route.fullPath)">
                <nuxt-link to="/jack">
                    <h2 class="blue-btn">Preview
                    </h2>
                </nuxt-link>
            </div>
            <div v-if="!checkParams(route.fullPath)" @click="$router.back()">
                <h2 class="blue-btn">Unpreview
                </h2>
            </div>
        </div>
    </nav>
    <main>
        <slot />
    </main>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const store = useLinksStore();
const route = useRoute()

const loading = ref(false)

const checkParams = (path: string) => {
    const regexp = new RegExp(/(^\/links\/$)|(^\/links$)|(^\/links\/profile(\/|)$)/, 'g')

    return (regexp.test(path))
}

const logOut = async () => {
    loading.value = true;
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log(error)
        loading.value = false
    } else {
        return navigateTo('/')
    }
}

onMounted(() => {

    console.log('from main', route.params.name)

    if (!user.value && route?.params?.name) {
        store.getUserNoAuth(route.params.name as string)
    } else {
        store.getAuthUser()
    }
})

</script>
<style>
body {
    font-family: "Red Hat Text", serif;
    background: rgb(234, 236, 241);
    display: flex;
    justify-content: center;
    /* align-items: center; */
    min-height: 100vh;
}
</style>