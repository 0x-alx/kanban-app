<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue'
import { store } from '@/store/store'
import Checkbox from '@/components/Checbox/Checkbox.vue'
import Modal from '@/components/Modal/Modal.vue'
import Select from '@/components/Select/Select.vue'

const isOpen = ref(false)

watchEffect(() => {
    if (store.showEditTaskModal) {
        isOpen.value = true
    } else {
        isOpen.value = false
    }
})

const totalSubtasks = computed(() => {
    return store.selectedTask.subtasks.length
})

const completedSubtasks = computed(() => {
    return store.selectedTask.subtasks.filter((subtask) => subtask.isCompleted).length
})

const statusOptions = computed(() => {
    return store.selectedBoard.columns.map((column) => ({
        value: column.id.toString(),
        label: column.name,
    }))
})
</script>

<template>
    <Modal :isOpen="isOpen">
        <div
            class="flex max-w-[90%] flex-col gap-4 bg-surface rounded-lg p-4 w-[480px] text-white"
            @click.stop
        >
            <div class="flex items-center justify-between">
                <h1 class="text-text text-lg font-bold">{{ store.selectedTask.title }}</h1>
            </div>
            <div class="flex items-center justify-between">
                <h2 class="text-gray text-sm font-bold">{{ store.selectedTask.description }}</h2>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="text-gray text-sm font-bold">
                    Subtasks ({{ completedSubtasks }} of {{ totalSubtasks }})
                </h3>
            </div>
            <div class="flex flex-col gap-3 items-center justify-between">
                <Checkbox
                    v-for="subtask in store.selectedTask.subtasks"
                    :key="subtask.id"
                    :subtask="subtask"
                />
            </div>
            <Select label="Status" :options="statusOptions" />
        </div>
    </Modal>
</template>
