<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="w-[760px] h-[400px] bg-white shadow m-auto rounded-md border border-gray-50 overflow-hidden">
            <div class="flex h-full">
                <section
                    class="w-7/12 bg-cover bg-center bg-[url(assets/images/person-with-computer.jpg)] bg-no-repeat bg-gray-100">
                </section>
                <section class="w-5/12 p-5 font-red-hat flex flex-col justify-center">
                    <h1 class="text-xl mb-3 font-semibold text-center">Login</h1>
                    <form action="" method="post">
                        <label class="font-light text-sm text-gray-700" for="name">Name</label> <br>
                        <input class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3" type="text"
                            name="name" id="name"> <br>

                        <label class="font-light text-sm text-gray-700" for="password">Password</label> <br>
                        <input class="py-1 px-2 bg-gray-50 w-full rounded border border-gray-200 mb-3" type="password"
                            name="password" id="password"> <br>
                        <button type="button"
                            class="bg-orange-400 text-xs font-semibold mt-3 py-2 px-6 border border-orange-300 rounded text-white uppercase w-full hover:bg-orange-700">Login</button>
                        <span class="relative block my-3 font-light text-xs text-gray-500">
                            <hr class="absolute w-full bottom-[7px] border border-gray-200">
                            <p class="relative bg-white mx-auto z-10 px-2 w-fit">
                                or
                            </p>
                        </span>
                        <a href="#" class="text-center block font-light text-sm text-gray-600 hover:underline">Register</a>
                    </form>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style lang="">

</style>