<template>
    <div>
        <div v-if="!loading" @click="logOut">
            <h2 class="red-btn text-center">Logout
            </h2>
        </div>
        <div v-if="loading">
            <h2 class="red-btn opacity-55 flex items-center justify-center">
                <Icon name="line-md:loading-twotone-loop" size="1.5rem" />
            </h2>
        </div>
        <!-- feature loading when profile urlname undefined (new) -->
        <div v-if="checkParams(route.fullPath)" @click="previewLink()">
            <h2 class="blue-btn">Preview
            </h2>
        </div>
        <div v-if="!checkParams(route.fullPath)" @click="$router.back()">
            <h2 class="blue-btn">Unpreview
            </h2>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLinksStore } from '~/store/LinksStore'
const store = useLinksStore();

const supabase = useSupabaseClient()

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

const previewLink = () => {
    const route = '/' + store.profile.urlName

    if (store.profile.urlName) navigateTo(route)
}
</script>
<style lang="">

</style>