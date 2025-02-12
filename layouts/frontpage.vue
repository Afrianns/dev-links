<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div class="w-[820px] h-[500px] bg-white shadow m-auto rounded-md border border-gray-50 overflow-hidden">
            <div class="flex h-full">
                <section
                    class="w-7/12 bg-cover bg-center bg-[url(assets/images/person-with-computer.jpg)] bg-no-repeat bg-gray-100">
                </section>
                <section class="w-5/12 p-5 font-red-hat flex flex-col justify-center">
                    <slot />
                </section>
            </div>
        </div>
    </div>
</template>