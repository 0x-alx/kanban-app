<script setup lang="ts">
import { Button } from '@/components'
import { store } from '@/store/store'
import type { Column } from '@/types'
import { provide, ref, watchEffect } from 'vue'
import CreateTaskModal from './CreateTaskModal.vue'
import EditTaskModal from './EditTaskModal.vue'
import KanbanBoard from './KanbanBoard.vue'

const columns = ref<Column[]>([])
const isLoading = ref(true)

const fetchColumns = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/columns/?boardId=${store.selectedBoard.id}`,
    )
    const data: Column[] = await response.json()
    columns.value = data
    store.setColumnsList(columns.value)
    console.log('BoardLayout.vue => columns', columns.value)
    isLoading.value = false
}
watchEffect(() => {
    if (!store.selectedBoard.id) return
    fetchColumns()
})

provide('columns', columns)
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
        <CreateTaskModal />
    </div>
</template>
