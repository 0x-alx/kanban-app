<script setup lang="ts">
import { ThemeToggle } from '@/components'
import BoardList from './BoardList.vue'
// import HideSidebarButton from './HideSidebarButton.vue' /* PartiallyEnd: #3632/scriptSetup.vue */ /* PartiallyEnd: #3632/scriptSetup.vue */
import HideSidebarButton from './HideSidebarButton.vue'
</script>

<template>
    <div
        class="w-[261px] xl:w-[300px] flex flex-col items-center justify-between h-full bg-surface pr-8 py-8"
    >
        <BoardList />
        <ThemeToggle />
        <div class="flex w-full flex-col gap-4 mt-6">
            <HideSidebarButton />
        </div>
    </div>
</template>
