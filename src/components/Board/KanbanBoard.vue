<script setup lang="ts">
import BoardCard from './BoardCard.vue'
import KanbanColumn from './KanbanColumn.vue'
import type { Column } from '@/types'

defineProps<{
    columns: Column[]
    isLoading: boolean
}>()
</script>

<template>
    <div v-if="isLoading" class="flex items-center justify-center w-full h-full">Loading...</div>
    <div v-else class="flex gap-4 min-w-min p-6">
        <div
            v-for="column in columns"
            :key="column.name"
            class="flex flex-col gap-4 rounded-lg p-4"
        >
            <KanbanColumn :label="column.name" :tasks="column.tasks" />
        </div>
        <div
            class="flex flex-col items-center justify-center gap-4 rounded-lg p-4 dark:bg-gray-light bg-dark-secondary w-[280px] h-full mt-22"
        >
            <div class="flex items-center justify-between">
                <h3 class="text-gray text-2xl font-bold">+ New Column</h3>
            </div>
        </div>
    </div>
</template>
