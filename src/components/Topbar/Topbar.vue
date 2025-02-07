<script setup lang="ts">
import { computed, reactive } from 'vue'
import { store } from '@/store/store'
import { Button } from '@/components'
import logoLight from '@/assets/logo-light.svg'
import logoDark from '@/assets/logo-dark.svg'
import logoMobile from '@/assets/logo-mobile.svg'
import { useTheme } from '@/utils/useTheme'

const { theme } = useTheme()

// Use computed for reactive logo switching
const currentLogo = computed(() => (theme.value === 'light' ? logoDark : logoLight))

const state = reactive({
    isOpen: false,
    totalSubtasks: 0,
    completedSubtasks: 0,
})
</script>

<template>
    <div
        class="flex items-center justify-between h-[64px] md:h-[81px] xl:h-[97px] w-full bg-surface"
    >
        <div class="items-center gap-2 xl:w-[300px] pl-12">
            <img :src="currentLogo" alt="Logo" class="hidden sm:block" />
            <img :src="logoMobile" alt="Logo" class="block sm:hidden" />
        </div>
        <div class="flex items-center gap-2 w-full justify-between pl-4 md:pl-24 xl:pl-12 pr-4">
            <h1 class="text-text text-lg sm:text-2xl font-bold">{{ store.selectedBoard.name }}</h1>
            <div class="hidden md:flex items-center gap-2">
                <Button label="+ Add New Task" />
            </div>
            <div class="md:hidden flex items-center gap-2">
                <Button label="+" />
            </div>
        </div>
    </div>
</template>
