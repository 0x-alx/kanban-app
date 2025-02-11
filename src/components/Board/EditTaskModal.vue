<script lang="ts" setup>
import { Checkbox, Modal } from '@/components'
import { store } from '@/store/store'
import type { Column } from '@/types'
import { inject, ref, watch, watchEffect } from 'vue'
import Select from '../Select/Select.vue'

const isOpen = ref(false)

watch(
    () => store.showEditTaskModal,
    (newValue) => {
        isOpen.value = newValue
    },
)
const columns = inject<Column[]>('columns')

watchEffect(() => {
    console.log('EditTaskModal.vue => columns', columns)
})

const completedSubtasks = ref(0)

const totalSubtasks = ref(0)
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
                :options="
                    columns?.map((column: Column) => ({
                        value: column.name,
                        label: column.name,
                    })) || []
                "
            />
        </div>
    </Modal>
</template>
