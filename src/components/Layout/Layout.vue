<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { Sidebar, Topbar } from '../'
import { store } from '@/store/store'

const isSidebarHidden = ref(false)

const sidebarClass = computed(() => {
    return isSidebarHidden.value ? 'md:hidden' : 'md:flex'
})

watchEffect(() => {
    isSidebarHidden.value = store.isSidebarHidden
})
</script>

<template>
    <div class="flex flex-col h-full w-full overflow-x-hidden">
        <Topbar />
        <div class="flex w-full overflow-x-hidden">
            <div class="hidden h-full" :class="sidebarClass">
                <Sidebar />
            </div>
            <slot />
        </div>
        <button
            @click="store.toggleSidebar()"
            class="absolute flex items-center justify-center w-16 bottom-20 -left-2 bg-primary p-4 rounded-r-full cursor-pointer hover:translate-x-2 transition-transform"
            :class="{ hidden: !isSidebarHidden }"
        >
            <img src="@/assets/icon-show-sidebar.svg" alt="Show Sidebar" />
        </button>
    </div>
</template>
