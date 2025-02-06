<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/store/store'
import { Button } from '@/components'
import logoLight from '@/assets/logo-light.svg'
import logoDark from '@/assets/logo-dark.svg'
import { useTheme } from '@/utils/useTheme'

const { theme } = useTheme()

// Use computed for reactive logo switching
const currentLogo = computed(() => (theme.value === 'light' ? logoDark : logoLight))
</script>

<template>
    <div
        class="flex items-center justify-between h-[64px] md:h-[81px] xl:h-[97px] w-full bg-surface"
    >
        <div class="flex items-center gap-2 xl:w-[300px] pl-12">
            <img :src="currentLogo" alt="Logo" />
        </div>
        <div class="flex items-center gap-2 w-full justify-between pl-12 pr-4">
            <h1 class="text-text text-2xl font-bold">{{ store.selectedBoard.name }}</h1>
            <div class="hidden md:flex items-center gap-2">
                <Button label="+ Add New Task" />
            </div>
            <div class="md:hidden flex items-center gap-2">
                <Button label="+" />
            </div>
        </div>
    </div>
</template>
