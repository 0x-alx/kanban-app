<script setup lang="ts">
import BoardListItem from './BoardListItem.vue'
import CreateBoardButton from './CreateBoardButton.vue'
import data from '@/data.json'
import { ref, onMounted } from 'vue'
import { store } from '@/store/store'

const boards = ref(data.boards)

onMounted(() => {
    store.selectedBoard = boards.value[0]
})

const handleBoardClick = (board: any) => {
    store.onSelectedBoardChange(board)
}
</script>

<template>
    <div class="flex w-full flex-col gap-4 h-full mt-14">
        <h1
            class="uppercase text-gray text-xs leading-[var(--line-height-heading-s)] tracking-[var(--letter-spacing-heading-s)] font-bold ml-12"
        >
            ALL BOARDS ({{ boards.length }})
        </h1>
        <BoardListItem
            v-for="board in boards"
            :key="board.name"
            :title="board.name"
            @click="() => handleBoardClick(board)"
            :selected="store.selectedBoard.name === board.name"
        />
        <CreateBoardButton :title="'+ Create New Board'" />
    </div>
</template>
