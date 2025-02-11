<script lang="ts" setup>
import { Checkbox, Modal } from '@/components'
import { store } from '@/store/store'
import type { Column } from '@/types'
import type { Ref } from 'vue'
import { computed, inject, ref, watch, watchEffect } from 'vue'
import Select from '../Select/Select.vue'

const isOpen = ref(false)
const status = ref('')
const columns = inject('columns') as Ref<Column[]>

watch(
    () => store.showEditTaskModal,
    (newValue) => {
        isOpen.value = newValue
    },
)

const defaultStatus = computed(() => {
    if (store.selectedTask && columns) {
        const currentColumn = columns.value.find((col) => col.id === store.selectedTask.columnId)
        return currentColumn?.name || ''
    }
    return ''
})

watchEffect(() => {
    console.log('EditTaskModal.vue => store.selectedTask', store.selectedTask)
    console.log('EditTaskModal.vue => columns', columns)
    console.log('EditTaskModal.vue => Array.isArray(columns)', typeof columns)
    console.log('EditTaskModal.vue => status', status.value)
})

const completedSubtasks = ref(0)

const handleChange = async (value: string) => {
    const column = columns.value.find((column) => column.name === value)
    if (!column || !store.selectedTask) return

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasks/${store.selectedTask.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ columnId: column.id }),
            },
        )

        if (response.ok) {
            // Update local state
            const oldColumnIndex = columns.value.findIndex(
                (col) => col.id === store.selectedTask.columnId,
            )
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
    } catch (error) {
        console.error('EditTaskModal.vue => error', error)
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
        </div>
    </Modal>
</template>
