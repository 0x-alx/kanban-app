<script setup lang="ts">
import { Button } from '@/components'
</script>

<template>
    <div class="w-full h-[calc(100vh-128px)] flex flex-col gap-8 items-center justify-center p-6">
        <h1 class="text-gray text-xl font-bold text-center">
            This board is empty. Create a new column to get started.
        </h1>
        <Button label="+ Add New Column" />
    </div>
</template>
