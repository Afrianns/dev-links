<template>
    <div class="flex flex-col items-center w-[500px] md:w-full justify-center h-screen">
        <div
            class="w-full md:w-[820px] md:h-[500px] bg-white md:shadow m-auto rounded-md md:border md:border-gray-50 overflow-hidden">
            <div class="flex md:h-full">
                <section
                    class="md:block hidden w-7/12 bg-cover bg-center bg-[url(assets/images/person-with-computer.jpg)] bg-no-repeat bg-gray-100">
                </section>
                <section class="w-full md:w-5/12 p-5 font-red-hat flex flex-col justify-center">

                    <slot />
                </section>
            </div>
        </div>
    </div>
</template>