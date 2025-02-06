<script setup lang="ts">
import { Button } from '@/components'
</script>

<template>
    <div
        class="flex items-center justify-between h-[64px] md:h-[81px] xl:h-[97px] w-full bg-surface px-4"
    >
        <h1 class="text-text text-2xl font-bold">Platform Launch</h1>
        <div class="flex items-center gap-2">
            <Button label="+ Add New Task" />
        </div>
    </div>
</template>
