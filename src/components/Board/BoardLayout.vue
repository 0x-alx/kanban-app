<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { store } from '@/store/store'
import { Button } from '@/components'
import KanbanBoard from './KanbanBoard.vue'
import EditTaskModal from './EditTaskModal.vue'
import type { Column } from '@/types'

const columns = ref<Column[]>([])
const isLoading = ref(true)

watchEffect(() => {
    if (store.selectedBoard?.columns) {
        columns.value = store.selectedBoard.columns
        isLoading.value = false
    }
})
</script>

<template>
    <div class="w-full h-[calc(100vh-100px)] flex flex-col gap-8 overflow-hidden">
        <div
            v-if="columns.length === 0"
            class="flex flex-col gap-4 items-center justify-center h-full"
        >
            <h1 class="text-gray text-xl font-bold text-center">
                This board is empty. Create a new column to get started.
            </h1>
            <Button label="+ Add New Column" />
        </div>
        <div v-else class="h-full overflow-x-auto">
            <KanbanBoard :columns="columns" :isLoading="isLoading" />
        </div>
        <EditTaskModal />
    </div>
</template>
