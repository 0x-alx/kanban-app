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

const handleCreateTask = () => {
    fetch('http://localhost:3000/tasks', {
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
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error))
}
</script>

<template>
    <Modal :isOpen="isOpen">
        <div class="bg-surface p-6 rounded-md" @click.stop>
            <h2 class="text-lg font-bold mb-6">Create Task</h2>

            <div class="mb-4">
                <label for="title" class="block mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    v-model="title"
                    class="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div class="mb-4">
                <label for="description" class="block mb-2">Description</label>
                <textarea
                    id="description"
                    v-model="description"
                    class="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <Button label="Create Task" @click="handleCreateTask" />
        </div>
    </Modal>
</template>
