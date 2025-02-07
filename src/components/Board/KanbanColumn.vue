<script setup lang="ts">
import BoardCard from './BoardCard.vue'
import type { Task } from '@/types'

defineProps<{
    label: string
    tasks: Task[]
    taskCount: number
}>()
</script>

<template>
    <div class="flex flex-col gap-4 min-w-[280px]">
        <div class="w-full h-4 rounded-full"></div>
        <h3
            class="text-gray text-xs font-bold uppercase tracking-[var(--letter-spacing-heading-s)]"
        >
            {{ label }} ({{ taskCount }})
        </h3>
    </div>
    <div class="flex flex-col gap-4">
        <BoardCard v-for="task in tasks" :key="task.id" :title="task.title" :task="task" />
    </div>
</template>
