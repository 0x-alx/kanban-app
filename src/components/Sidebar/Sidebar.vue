<script setup lang="ts">
import { watch, computed } from 'vue'
import ThemeToggle from '../ThemeToggle/ThemeToggle.vue'
import { useTheme } from '@/utils/useTheme'
import logoLight from '@/assets/logo-light.svg'
import logoDark from '@/assets/logo-dark.svg'

const { theme } = useTheme()

// Use computed for reactive logo switching
const currentLogo = computed(() => (theme.value === 'light' ? logoDark : logoLight))

watch(theme, (newTheme) => {
    console.log('Sidebar - Theme changed to:', newTheme)
})
</script>

<template>
    <div
        class="w-[261px] xl:w-[300px] flex flex-col items-center justify-between h-full bg-surface px-6 py-8"
    >
        <img :src="currentLogo" alt="logo" />
        <ThemeToggle />
    </div>
</template>
