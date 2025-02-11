<script lang="ts" setup>
import { Checkbox, Modal } from '@/components'
import { store } from '@/store/store'
import type { Column, Subtask } from '@/types'
import type { Ref } from 'vue'
import { computed, inject, ref, watch, watchEffect } from 'vue'
import Select from '../Select/Select.vue'

const isOpen = ref(false)
const status = ref('')
const originalStatus = ref('')
const originalSubtasks = ref<Subtask[]>([])
const columns = inject('columns') as Ref<Column[]>

// Initialize status when modal opens and store original values
watch(
    () => store.showEditTaskModal,
    (newValue) => {
        isOpen.value = newValue
        if (newValue && store.selectedTask) {
            // Find current column name for the task
            const currentColumn = columns.value.find(
                (col) => col.id === store.selectedTask.columnId,
            )
            // Set both current and original status
            status.value = currentColumn?.name || ''
            originalStatus.value =
                columns.value.find((col) => col.id === store.selectedTask?.columnId)?.name || ''
            originalSubtasks.value = JSON.parse(JSON.stringify(store.selectedTask.subtasks))
        }
    },
)

console.log('EditTaskModal.vue => status.value', status.value)
console.log('EditTaskModal.vue => originalStatus.value', originalStatus.value)

// For debugging
watchEffect(() => {
    console.log('EditTaskModal.vue => status', {
        current: status.value,
        original: originalStatus.value,
        selectedTaskColumnId: store.selectedTask?.columnId,
        currentColumn: columns.value.find((col) => col.id === store.selectedTask?.columnId)?.name,
    })
})

const defaultStatus = computed(() => {
    if (store.selectedTask && columns) {
        const currentColumn = columns.value.find((col) => col.id === store.selectedTask.columnId)
        return currentColumn?.name || ''
    }
    return ''
})

const completedSubtasks = ref(0)

// Modify handleChange to only update local state without API call
const handleChange = (value: string) => {
    const column = columns.value.find((col) => col.name === value)
    if (!column || !store.selectedTask) return

    // Update local state immediately for UI feedback
    const oldColumnIndex = columns.value.findIndex((col) => col.id === store.selectedTask.columnId)
    const newColumnIndex = columns.value.findIndex((col) => col.id === column.id)

    if (oldColumnIndex !== -1 && newColumnIndex !== -1) {
        // Remove task from old column
        const taskIndex = columns.value[oldColumnIndex].tasks.findIndex(
            (task) => task.id === store.selectedTask.id,
        )
        if (taskIndex !== -1) {
            const task = columns.value[oldColumnIndex].tasks.splice(taskIndex, 1)[0]
            // Add task to new column
            task.columnId = column.id
            columns.value[newColumnIndex].tasks.push(task)
            // Update store
            store.updateTaskColumn(task.id, column.id)
        }
    }
}

// Handle all API updates in handleSave
const handleSave = async () => {
    if (!store.selectedTask) return

    try {
        const currentColumn = columns.value.find((col) => col.id === store.selectedTask.columnId)
        // 1. Update task column if changed
        console.log('EditTaskModal.vue => status.value', status.value)
        console.log('EditTaskModal.vue => originalStatus.value', originalStatus.value)
        if (currentColumn?.name !== originalStatus.value) {
            const column = columns.value.find((col) => col.name === currentColumn?.name)
            if (column) {
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${store.selectedTask.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ columnId: column.id }),
                })
            }
        }

        // 2. Update modified subtasks
        const subtaskPromises = store.selectedTask.subtasks
            .filter((subtask, index) => {
                return subtask.isCompleted !== originalSubtasks.value[index].isCompleted
            })
            .map((subtask) =>
                fetch(`${import.meta.env.VITE_BACKEND_URL}/subtasks/${subtask.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        isCompleted: subtask.isCompleted,
                    }),
                }),
            )

        if (subtaskPromises.length > 0) {
            await Promise.all(subtaskPromises)
        }

        // Close modal after successful update
        store.setShowEditTaskModal(false)
    } catch (error) {
        console.error('EditTaskModal.vue => error saving task:', error)
    }
}
</script>

<template>
    <Modal :isOpen="isOpen">
        <div
            class="flex max-w-[90%] flex-col gap-4 bg-surface rounded-lg p-4 w-[480px] text-white"
            @click.stop
        >
            <div class="flex items-center justify-between">
                <h1 class="text-text text-lg font-bold">{{ store.selectedTask?.title }}</h1>
            </div>
            <div class="flex items-center justify-between">
                <h2 class="text-gray text-sm font-bold">{{ store.selectedTask?.description }}</h2>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="text-gray text-sm font-bold">
                    Subtasks ({{ completedSubtasks }} of {{ store.selectedTask?.subtasks.length }})
                </h3>
            </div>
            <div class="flex flex-col gap-3 items-center justify-between">
                <Checkbox
                    v-for="(subtask, index) in store.selectedTask?.subtasks"
                    :key="subtask.id"
                    :subtask="subtask"
                    v-model="store.selectedTask.subtasks[index].isCompleted"
                />
            </div>
            <Select
                label="Status"
                :selectedValue="defaultStatus"
                :options="
                    columns?.map((column: Column) => ({
                        value: column.name,
                        label: column.name,
                    })) || []
                "
                :handleChange="handleChange"
            />
            <button
                class="w-full bg-primary rounded-md font-bold p-2 cursor-pointer"
                @click="handleSave"
            >
                Save
            </button>
        </div>
    </Modal>
</template>
