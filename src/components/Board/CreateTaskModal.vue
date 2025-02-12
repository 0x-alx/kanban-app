<script setup lang="ts">
import { Button, Modal } from '@/components'
import { store } from '@/store/store'
import { computed, ref, watch } from 'vue'

const title = ref('')
const description = ref('')
const isOpen = ref(false)

const firstColumnId = computed(() => {
    return store.columnsList[0].id
})

watch(
    () => store.showCreateTaskModal,
    (newValue) => {
        isOpen.value = newValue
    },
)

const handleCreateTask = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                boardId: store.selectedBoard.id,
                columnId: firstColumnId.value,
            }),
        })
        const data = await response.json()
        console.log(data)
        store.setShowCreateTaskModal(false)
        // Reset form fields
        title.value = ''
        description.value = ''
        // Emit event to trigger re-fetch
        store.refreshBoard()
    } catch (error) {
        console.error('Error:', error)
    }
}
</script>

<template>
    <Modal :isOpen="isOpen">
        <div class="bg-surface p-6 rounded-md w-[480px] text-white" @click.stop>
            <h2 class="text-text text-lg font-bold mb-6">Create Task</h2>

            <div class="mb-4">
                <label for="title" class="block mb-2 text-sm font-bold text-text">Title</label>
                <input
                    type="text"
                    id="title"
                    v-model="title"
                    class="w-full p-2 border border-gray-300 rounded-md text-text"
                />
            </div>
            <div class="mb-4">
                <label for="description" class="block mb-2 text-sm font-bold text-text"
                    >Description</label
                >
                <textarea
                    id="description"
                    v-model="description"
                    class="w-full p-2 border border-gray-300 rounded-md text-text"
                />
            </div>
            <Button class="w-full rounded-md" label="Create Task" @click="handleCreateTask" />
        </div>
    </Modal>
</template>
