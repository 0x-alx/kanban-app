<script setup lang="ts">
import { useTheme } from '@/utils/useTheme'
import { onMounted, watch } from 'vue'
import sunIcon from '@/assets/icon-light-theme.svg'
import moonIcon from '@/assets/icon-dark-theme.svg'

const { theme, toggleTheme, initTheme } = useTheme()

onMounted(() => {
    initTheme()
})
</script>

<template>
    <div class="flex items-center justify-center w-full bg-background rounded-md">
        <div class="flex items-center gap-4 p-2">
            <!-- Sun icon -->
            <img :src="sunIcon" alt="light mode" class="w-5 h-5" />

            <!-- Switch button -->
            <button
                @click="toggleTheme"
                class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary hover:bg-primary-light transition-colors cursor-pointer duration-200"
                :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
            >
                <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"
                    :class="theme === 'dark' ? 'translate-x-6' : 'translate-x-1'"
                ></span>
            </button>

            <!-- Moon icon -->
            <img :src="moonIcon" alt="dark mode" class="w-5 h-5" />
        </div>
    </div>
</template>
