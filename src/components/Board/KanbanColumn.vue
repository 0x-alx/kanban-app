<script setup lang="ts">
import { store } from '@/store/store'
import type { Task } from '@/types'
import { ref, watchEffect } from 'vue'
import BoardCard from './BoardCard.vue'
const props = defineProps<{
    label: string
    tasks: Task[]
    taskCount: number
}>()

const tasks = ref<Task[]>([])

watchEffect(() => {
    tasks.value = props.tasks
    console.log('KanbanColumn.vue => tasks', tasks.value)
})

const onTaskClick = (task: Task) => {
    console.log('KanbanColumn.vue => task', task.id)
    store.setSelectedTask(task)
    store.setShowEditTaskModal(true)
    console.log('KanbanColumn.vue => open modal', store.showEditTaskModal)
}
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
        <BoardCard
            v-for="task in tasks"
            :key="task.id"
            :title="task.title"
            :subtasks="task.subtasks"
            @click="onTaskClick(task)"
        />
    </div>
</template>
