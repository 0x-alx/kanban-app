<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/store/store'
import type { Task } from '@/types'

const props = defineProps<{
    title: string
    task: Task
}>()

const completedSubtasks = computed(() => {
    return props.task.subtasks.filter((subtask) => subtask.isCompleted)
})

const totalSubtasks = computed(() => {
    return props.task.subtasks.length
})

const onTaskClick = () => {
    console.log('onTaskClick')
    store.setShowEditTaskModal(true)
    store.setSelectedTask(props.task)
}
</script>

<template>
    <div class="bg-surface rounded-lg p-4 w-[280px] shadow-md cursor-pointer" @click="onTaskClick">
        <h3 class="text-text text-md font-bold">{{ title }}</h3>
        <span class="text-gray text-sm font-bold"
            >{{ completedSubtasks.length }} of {{ totalSubtasks }} subtasks</span
        >
    </div>
</template>
