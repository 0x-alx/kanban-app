<script setup lang="ts">
import { watch, computed, inject } from 'vue'
import ThemeToggle from '../ThemeToggle/ThemeToggle.vue'
import { useTheme } from '@/utils/useTheme'
import logoLight from '@/assets/logo-light.svg'
import logoDark from '@/assets/logo-dark.svg'
import BoardList from './BoardList.vue'
import HideSidebarButton from './HideSidebarButton.vue'
const { theme } = useTheme()
import { store } from '@/store/store'

// Use computed for reactive logo switching
const currentLogo = computed(() => (theme.value === 'light' ? logoDark : logoLight))
</script>

<template>
    <div
        class="w-[261px] xl:w-[300px] flex flex-col items-center justify-between h-full bg-surface pr-8 py-8"
    >
        <img :src="currentLogo" alt="logo" />
        <BoardList />
        <ThemeToggle />
        <div class="flex w-full flex-col gap-4 pl-8 mt-6">
            <HideSidebarButton />
        </div>
    </div>
</template>
