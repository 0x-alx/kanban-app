<script setup lang="ts">
import type { Subtask } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
    title: string
    subtasks: Subtask[]
}>()

const onTaskClick = () => {
    console.log('onTaskClick')
}

const completedSubtasks = computed(() => {
    return props.subtasks.filter((subtask) => subtask.isCompleted).length
})
</script>

<template>
    <div class="bg-surface rounded-lg p-4 w-[280px] shadow-md cursor-pointer" @click="onTaskClick">
        <h3 class="text-text text-md font-bold">{{ title }}</h3>
        <span class="text-gray text-sm font-bold"
            >{{ completedSubtasks }} of {{ subtasks.length }} subtasks</span
        >
    </div>
</template>
