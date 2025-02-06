<script setup lang="ts">
import { store } from '@/store/store'
import { Button } from '@/components'
</script>

<template>
    <div
        class="flex items-center justify-between h-[64px] md:h-[81px] xl:h-[97px] w-full bg-surface px-4"
    >
        <h1 class="text-text text-2xl font-bold">{{ store.selectedBoard.name }}</h1>

        <div class="hidden md:flex items-center gap-2">
            <Button label="+ Add New Task" />
        </div>
        <div class="md:hidden flex items-center gap-2">
            <Button label="+" />
        </div>
    </div>
</template>
