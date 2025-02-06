<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    title: string
    task: {
        id: string | number
        title: string
        subtasks: Array<{ isCompleted: boolean }>
    }
}>()

const completedSubtasks = computed(() => {
    return props.task.subtasks.filter((subtask) => subtask.isCompleted)
})

const totalSubtasks = computed(() => {
    return props.task.subtasks.length
})
</script>

<template>
    <div class="bg-surface rounded-lg p-4 w-[280px] shadow-md">
        <h3 class="text-text text-md font-bold">{{ title }}</h3>
        <span class="text-gray text-sm font-bold"
            >{{ completedSubtasks.length }} of {{ totalSubtasks }} subtasks</span
        >
    </div>
</template>
